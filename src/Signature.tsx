import { useEffect, useRef } from 'react';

import logoMarkup from './logo.svg?raw';

type Color = 'pink' | 'blue';
type Direction = 'forward' | 'backward';
type Section = 'mukul' | 'hase';

type Layer = {
  direction: Direction;
  path: SVGPathElement;
  visible: boolean;
};

type Subsection = {
  index: number;
  layers: Record<Color, Layer>;
  section: Section;
};

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const INTRO_DURATION_MS = 5400;

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const findNaturalBoundaries = (path: SVGPathElement, subsectionCount: number) => {
  const length = path.getTotalLength();
  const sampleCount = 240;
  const candidates: Array<{ position: number; score: number }> = [];

  for (let sample = 2; sample < sampleCount - 2; sample += 1) {
    const position = (sample / sampleCount) * length;
    const distance = length / sampleCount;
    const previous = path.getPointAtLength(position - distance);
    const current = path.getPointAtLength(position);
    const next = path.getPointAtLength(position + distance);
    const incoming = { x: current.x - previous.x, y: current.y - previous.y };
    const outgoing = { x: next.x - current.x, y: next.y - current.y };
    const incomingLength = Math.hypot(incoming.x, incoming.y);
    const outgoingLength = Math.hypot(outgoing.x, outgoing.y);
    const cosine = Math.max(
      -1,
      Math.min(
        1,
        (incoming.x * outgoing.x + incoming.y * outgoing.y) /
          (incomingLength * outgoingLength || 1),
      ),
    );

    candidates.push({ position, score: Math.acos(cosine) });
  }

  const minimumSpacing = length / (subsectionCount * 1.8);
  const selected: number[] = [];

  candidates
    .sort((left, right) => right.score - left.score)
    .some(({ position }) => {
      const awayFromEnds = position > minimumSpacing && position < length - minimumSpacing;
      const awayFromSelection = selected.every(
        (selectedPosition) => Math.abs(selectedPosition - position) >= minimumSpacing,
      );

      if (awayFromEnds && awayFromSelection) {
        selected.push(position);
      }

      return selected.length === subsectionCount - 1;
    });

  while (selected.length < subsectionCount - 1) {
    const position = ((selected.length + 1) / subsectionCount) * length;
    if (selected.every((selectedPosition) => Math.abs(selectedPosition - position) > 1)) {
      selected.push(position);
    } else {
      selected.push(position + selected.length);
    }
  }

  return [0, ...selected.sort((left, right) => left - right), length];
};

const segmentPattern = (
  pathLength: number,
  start: number,
  subsectionLength: number,
  progress: number,
  anchoredAtEnd = false,
) => {
  const visibleLength = subsectionLength * progress;
  const visibleStart = anchoredAtEnd ? start + subsectionLength - visibleLength : start;
  const trailingGap = pathLength - visibleStart - visibleLength + pathLength;
  return `0 ${visibleStart} ${visibleLength} ${trailingGap}`;
};

const Signature = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timers = new Set<number>();
    const runningAnimations = new Set<Animation>();
    let stopped = false;

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };

    const beginRandomAnimation = () => {
      if (stopped) {
        return;
      }

      const svg = container.querySelector('svg');
      if (!svg) {
        return;
      }

      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');

      const sourcePaths = Array.from(
        svg.querySelectorAll<SVGPathElement>('path[data-ignore="true"]'),
      );
      const pinkSources = sourcePaths.filter((path) => path.classList.contains('cls-2'));
      const blueSources = sourcePaths.filter((path) => path.classList.contains('cls-1'));
      const animatedIntroPaths = Array.from(
        svg.querySelectorAll<SVGPathElement>('path[data-start]'),
      );
      const randomGroup = document.createElementNS(SVG_NAMESPACE, 'g');
      const subsections: Subsection[] = [];
      const lockedSubsections = new Set<Subsection>();
      let subsectionIndex = 0;

      randomGroup.setAttribute('data-random-signature', 'true');

      const addPathSubsections = (
        section: Section,
        pinkSource: SVGPathElement,
        blueSource: SVGPathElement,
        count: number,
      ) => {
        const boundaries = findNaturalBoundaries(blueSource, count);
        const pathLength = blueSource.getTotalLength();

        for (let boundary = 0; boundary < boundaries.length - 1; boundary += 1) {
          const start = boundaries[boundary];
          const subsectionLength = boundaries[boundary + 1] - start;
          const subsectionGroup = document.createElementNS(SVG_NAMESPACE, 'g');
          const layers = {} as Record<Color, Layer>;

          subsectionGroup.setAttribute('data-signature-subsection', String(subsectionIndex));
          randomGroup.appendChild(subsectionGroup);

          (['pink', 'blue'] as const).forEach((color) => {
            const source = color === 'pink' ? pinkSource : blueSource;
            const clone = source.cloneNode(false) as SVGPathElement;

            clone.removeAttribute('data-ignore');
            clone.setAttribute('data-section', section);
            clone.setAttribute('data-subsection', String(subsectionIndex));
            clone.setAttribute('data-color', color);
            clone.style.opacity = '1';
            clone.style.strokeDasharray = segmentPattern(pathLength, start, subsectionLength, 1);
            clone.dataset.pathLength = String(pathLength);
            clone.dataset.segmentStart = String(start);
            clone.dataset.segmentLength = String(subsectionLength);
            subsectionGroup.appendChild(clone);
            layers[color] = { direction: 'backward', path: clone, visible: true };
          });

          subsections.push({ index: subsectionIndex, layers, section });
          subsectionIndex += 1;
        }
      };

      addPathSubsections('mukul', pinkSources[0], blueSources[0], 8);
      addPathSubsections('hase', pinkSources[1], blueSources[1], 4);
      addPathSubsections('hase', pinkSources[2], blueSources[2], 3);

      svg.appendChild(randomGroup);
      animatedIntroPaths.forEach((path) => {
        path.style.opacity = '0';
      });

      const animateLayer = (
        layer: Layer,
        targetVisible: boolean,
        duration: number,
        direction: Direction,
      ) => {
        const pathLength = Number(layer.path.dataset.pathLength);
        const start = Number(layer.path.dataset.segmentStart);
        const subsectionLength = Number(layer.path.dataset.segmentLength);
        const anchoredAtEnd =
          (direction === 'forward') !== targetVisible;
        layer.path.dataset.direction = direction;
        if (targetVisible) {
          layer.path.parentNode?.appendChild(layer.path);
        }
        const from = segmentPattern(
          pathLength,
          start,
          subsectionLength,
          layer.visible ? 1 : 0,
          anchoredAtEnd,
        );
        const to = segmentPattern(
          pathLength,
          start,
          subsectionLength,
          targetVisible ? 1 : 0,
          anchoredAtEnd,
        );
        const animation = layer.path.animate(
          [{ strokeDasharray: from }, { strokeDasharray: to }],
          {
            duration,
            easing: 'cubic-bezier(.65, 0, .35, 1)',
            fill: 'forwards',
          },
        );

        runningAnimations.add(animation);
        return animation.finished
          .catch(() => undefined)
          .then(() => {
            layer.direction = direction;
            layer.path.style.strokeDasharray = to;
            layer.visible = targetVisible;
            animation.cancel();
            runningAnimations.delete(animation);
          });
      };

      const selectCombination = (
        sectionSubsections: Subsection[],
        anchorIndex: number,
        isEligible: (subsection: Subsection) => boolean,
      ) => {
        const sizeRoll = Math.random();
        const requestedSize = sizeRoll < 0.2 ? 2 : sizeRoll < 0.62 ? 3 : sizeRoll < 0.9 ? 4 : 5;
        const combinationSize = Math.min(requestedSize, sectionSubsections.length);
        const selectedIndexes = new Set([anchorIndex]);

        while (selectedIndexes.size < combinationSize) {
          const sortedIndexes = [...selectedIndexes].sort((left, right) => left - right);
          const firstIndex = sortedIndexes[0];
          const lastIndex = sortedIndexes[sortedIndexes.length - 1];
          const neighboringIndexes = [firstIndex - 1, lastIndex + 1].filter(
            (index) =>
              index >= 0 &&
              index < sectionSubsections.length &&
              !selectedIndexes.has(index) &&
              isEligible(sectionSubsections[index]),
          );
          if (neighboringIndexes.length === 0) {
            break;
          }

          const nextIndex =
            neighboringIndexes[Math.floor(Math.random() * neighboringIndexes.length)];

          selectedIndexes.add(nextIndex);
        }

        return [...selectedIndexes]
          .sort((left, right) => left - right)
          .map((index) => sectionSubsections[index]);
      };

      const performRandomChange = async () => {
        if (stopped) {
          return;
        }

        const availableHiddenLayers = subsections.flatMap((subsection) =>
          (['pink', 'blue'] as const)
            .filter(
              (color) =>
                !lockedSubsections.has(subsection) &&
                !subsection.layers[color].visible,
            )
            .map((color) => ({ color, subsection })),
        );
        const hiddenLayerCount = subsections.reduce(
          (count, subsection) =>
            count + Number(!subsection.layers.pink.visible) + Number(!subsection.layers.blue.visible),
          0,
        );
        const shouldRestore =
          availableHiddenLayers.length > 0 &&
          (hiddenLayerCount > subsections.length * 0.42 || Math.random() < 0.38);
        let section: Section = Math.random() < 0.58 ? 'mukul' : 'hase';
        let sectionSubsections = subsections.filter(
          (subsection) => subsection.section === section,
        );
        let color: Color = Math.random() < 0.5 ? 'pink' : 'blue';
        let direction: Direction = Math.random() < 0.5 ? 'forward' : 'backward';
        let targetVisible = false;
        let anchor: Subsection | undefined;

        if (shouldRestore) {
          const hidden =
            availableHiddenLayers[Math.floor(Math.random() * availableHiddenLayers.length)];
          section = hidden.subsection.section;
          sectionSubsections = subsections.filter(
            (subsection) => subsection.section === section,
          );
          color = hidden.color;
          direction = hidden.subsection.layers[color].direction;
          anchor = hidden.subsection;
          targetVisible = true;
        } else {
          const otherColor: Color = color === 'pink' ? 'blue' : 'pink';
          const hideableSubsections = sectionSubsections.filter(
            (subsection) =>
              !lockedSubsections.has(subsection) &&
              subsection.layers[color].visible &&
              subsection.layers[otherColor].visible,
          );

          anchor =
            hideableSubsections[Math.floor(Math.random() * hideableSubsections.length)];
        }

        if (!anchor) {
          return;
        }

        const otherColor: Color = color === 'pink' ? 'blue' : 'pink';
        const isEligible = (subsection: Subsection) => {
          const layer = subsection.layers[color];
          return (
            !lockedSubsections.has(subsection) &&
            layer.visible !== targetVisible &&
            (!targetVisible || layer.direction === direction) &&
            (targetVisible || subsection.layers[otherColor].visible)
          );
        };
        const combination = selectCombination(
          sectionSubsections,
          sectionSubsections.indexOf(anchor),
          isEligible,
        );
        const orderedSubsections = [...combination].sort((left, right) =>
          direction === 'forward' ? left.index - right.index : right.index - left.index,
        );
        const totalLength = orderedSubsections.reduce(
          (length, subsection) =>
            length + Number(subsection.layers[color].path.dataset.segmentLength),
          0,
        );
        const gestureDuration = randomBetween(900, 1500);

        combination.forEach((subsection) => lockedSubsections.add(subsection));

        try {
          for (const subsection of orderedSubsections) {
            const subsectionLength = Number(
              subsection.layers[color].path.dataset.segmentLength,
            );
            const duration = gestureDuration * (subsectionLength / totalLength);

            await animateLayer(
              subsection.layers[color],
              targetVisible,
              duration,
              direction,
            );
          }
        } finally {
          combination.forEach((subsection) => lockedSubsections.delete(subsection));
        }
      };

      const scheduleRandomChange = () => {
        if (stopped) {
          return;
        }

        void performRandomChange();
        schedule(scheduleRandomChange, randomBetween(360, 780));
      };

      schedule(scheduleRandomChange, 650);
    };

    schedule(beginRandomAnimation, INTRO_DURATION_MS);

    return () => {
      stopped = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      runningAnimations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="signature"
      role="img"
      aria-label="Mukul Hase"
      dangerouslySetInnerHTML={{ __html: logoMarkup }}
    />
  );
};

export default Signature;
