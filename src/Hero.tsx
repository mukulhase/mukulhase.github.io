import React from 'react';
import ReactVivus from 'react-vivus';
import Tilt from 'react-parallax-tilt';
import Button from "@material-ui/core/Button";
import MusicNoteIcon from "@material-ui/icons/MusicNoteOutlined";
import WorkIcon from "@material-ui/icons/WorkOutlineOutlined";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Grid} from "@material-ui/core";
import logo from './logo.svg';

const Hero = () => (
    <Grid
        item
        style={{
            width: "100%",
        }}
    >
        <Tilt
            gyroscope={true}
            tiltAngleXInitial={10}
            tiltAngleYInitial={10}
            trackOnWindow={true}
        >
            <Grid
                container
                justify="center"
            >
                <Grid item style={{
                    width:"100%",
                    padding: 50,
                    overflow: "hidden"
                }}>
                    <ReactVivus
                        id="foo"
                        option={{
                            file: logo,
                            animTimingFunction: 'EASE',
                            type: 'scenario',
                            onReady: console.log,
                        }}
                        className="App-logo"
                        callback={(myVivus: any) => {
                            if (myVivus.getStatus() === 'end') {
                                myVivus.reset().play();
                            }
                        }}
                    />
                </Grid>
                <Grid item style={{
                    padding: 20
                }}>
                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                    >
                        <Button
                            variant="outlined"
                            endIcon={<MusicNoteIcon color="secondary"/>}
                            href={"https://music.mukulhase.com"}
                        >
                            My Music
                        </Button>
                        <Button
                            variant="outlined"
                            endIcon={<WorkIcon color="secondary"/>}
                            href={"http://mukulhase.com/Mukul_Hase_Resume/main.pdf"}
                        >
                            My Work
                        </Button>
                        <Button
                            variant="outlined"
                            endIcon={<EmojiObjectsOutlinedIcon color="secondary" />}
                        >
                            My Thoughts
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Tilt>
    </Grid>
);

export default Hero;