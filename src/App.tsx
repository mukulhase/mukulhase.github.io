import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SocialIcon} from 'react-social-icons';
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import ReactVivus from 'react-vivus';
import Tilt from 'react-parallax-tilt';


function App() {
    let urls = [
        "https://www.facebook.com/mukul.hase",
        "https://github.com/mukulhase",
        "https://www.linkedin.com/in/mukul-hase-42069/"
    ];
    return (
        <Container maxWidth={"md"} className="App">
            <div className="App-center">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Tilt
                            gyroscope={true}
                            tiltAngleXInitial={10}
                            tiltAngleYInitial={10}
                            trackOnWindow={true}
                        >
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
                        </Tilt>
                    </Grid>
                    <Grid item>
                        <div>
                            {urls.map(url=><SocialIcon url={url}></SocialIcon>)}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default App;
