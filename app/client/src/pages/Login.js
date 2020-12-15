import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import MaterialUI from "../components/layout/Material";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Login() {

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

  // route for user login
  const onLogin = () => {
    window.location.href = "http://localhost:4000/login";
  };

  return (
    <ThemeProvider theme={theme}>
      <Head />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          <MaterialUI paperClass="paper-login">
            <Typography variant="h4" component="h2" gutterBottom>
              Login
            </Typography>
            <Button variant="contained" color="primary"  startIcon={<TwitterIcon />} onClick = {()=> onLogin()}>
              Sign in Here
            </Button>
          </MaterialUI>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
