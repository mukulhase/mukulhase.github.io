import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SocialIcon} from 'react-social-icons';
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import ReactVivus from 'react-vivus';
import Tilt from 'react-parallax-tilt';
import Button from "@material-ui/core/Button";
import MusicNoteIcon from "@material-ui/icons/MusicNoteOutlined";
import WorkIcon from "@material-ui/icons/WorkOutlineOutlined";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import teal from "@material-ui/core/colors/teal";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#29abe2"
        },
        secondary: {
            main: "#ff7bac"
        }
    },
});

function App() {
    let urls = [
        "https://www.facebook.com/mukul.hase",
        "https://github.com/mukulhase",
        "https://www.linkedin.com/in/mukul-hase-42069/",
        "https://open.spotify.com/user/213i4eofdg43qmfvheiso7tza"
    ];
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={"md"} className="App">
                <div className="App-center">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center"
                              style={{
                                  flexGrow:1
                              }}
                        >
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
                        </Grid>
                        <div style={{
                            padding: 20
                        }}>
                            <div>
                                {urls.map(url=><span key={url} style={{padding:5}}><SocialIcon url={url}></SocialIcon></span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
           );
}

export default App;
