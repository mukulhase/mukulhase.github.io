import React from 'react';
import './App.css';
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import Social from './Social';
import Hero from './Hero';

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

const App = () => (
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
                            <Hero />
                        </Grid>
                        <Social />
                    </div>
                </div>
            </Container>
        </ThemeProvider>
        );


export default App;
