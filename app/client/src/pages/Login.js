import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import MaterialUI from "../components/layout/Material";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Login() {
  const [showalert, setShowAlert] = React.useState(false);
  const [errormsg, setErrorMsg] = React.useState("");

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

  const onSuccess = () => {
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
            <Button variant="contained" color="primary"  startIcon={<TwitterIcon />} onClick = {()=> onSuccess()}>
              Sign in Here
            </Button>
            {showalert && (
              <Alert severity="error" style={{ marginTop: "1rem" }}>
                {errormsg}
              </Alert>
            )}
          </MaterialUI>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
