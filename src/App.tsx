import './App.css';

import Hero from './Hero';
import Social from './Social';

const App = () => (
  <main className="app">
    <section className="hero-section" aria-labelledby="page-title">
      <h1 id="page-title" className="visually-hidden">
        Mukul Hase
      </h1>
      <Hero />
    </section>
    <Social />
  </main>
);

export default App;
