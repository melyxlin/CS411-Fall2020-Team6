import React from "react";
import { Grid, Typography } from "@material-ui/core";
import {Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import MaterialUI from "../components/layout/Material";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';

function Login() {

    const customHeader = {};

  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "dark",
        primary: blue,
        secondary: {
          main: "#ce93d8",
        },
      },
    })
  );

  const onSuccess = (response) => {
    response.json().then(body => {
      alert(JSON.stringify(body));
    });
  };

  const onFailed = (error) => {
    alert(error);
  }

  return (
    <ThemeProvider theme={theme}>
       <Head />
    <Grid container justify="center" alignItems="center">
      <Grid item xs={6} >
        <MaterialUI paperClass="paper-login">
        <Typography variant="h4" component="h2" gutterBottom>
Login
      </Typography>
        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter" //need to change
                      onFailure={onFailed}
                      onSuccess={onSuccess}
                      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" //need to change
                      showIcon={true}
                      customHeaders={customHeader}
                      forceLogin={true}/>
                
        </MaterialUI>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}

export default Login;