import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import MaterialUI from "../components/layout/Material";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TwitterLogin from "react-twitter-auth";
import Alert from "@material-ui/lab/Alert";

export default function Login() {
  const customHeader = {};
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

  // const onLogin = () =>{
  //   localStorage.setItem('loggedin', 'true');
  //   window.location.reload();
  // }

  const onSuccess = () => {
    // response.json().then((body) => {
    //   alert(JSON.stringify(body));
    // });
    localStorage.setItem("loggedin", "true");
    window.location.reload();
  };

  const onFailed = (error) => {
    setShowAlert(true);
    setErrorMsg(error.message);
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
            {/* <TwitterLogin
              loginUrl="http://localhost:4000/api/v1/auth/twitter" //need to change
              onFailure={onFailed}
              onSuccess={onSuccess}
              requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" //need to change
              showIcon={true}
              customHeaders={customHeader}
              forceLogin={true}
            /> */}
            <Button onClick = {()=> onSuccess()}>
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
