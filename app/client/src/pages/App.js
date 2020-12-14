import React, { useState, useEffect } from "react";
import MaterialUI from "../components/layout/Material";
import { Grid } from "@material-ui/core";
import { TranslateForm, TranslateDisplay, Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import {getUserData} from "../utils/apiRoutes"

export default function App() {
  const [response, setResponse] = useState([]);
  const [responseVisable, setResponseVisable] = useState(false);

  const callBackResponse = (childData) => {
    setResponse(childData);
    setResponseVisable(true);
  };

  const getUser = async () => {
    var url = window.location.href;
    var oauth_token = url.match(/oauth_token=(.*)&oauth_verifier/)[1];
    var oauth_verifier = url.match(/&oauth_verifier=(.*)/)[1]
    
    // const user = await getUserData(oauth_token,oauth_verifier);
    // console.log(user);
  };

  useEffect(() => {
    getUser()
  });

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

  return (
    <ThemeProvider theme={theme}>
      <Head auth={true} />
      <Grid container>
        <Grid item xs>
          <MaterialUI paperClass="paper-top">
            <TranslateForm
              parentCallback={(childData) => callBackResponse(childData)}
            />
          </MaterialUI>
        </Grid>
        <Grid item xs>
          <Grid container direction="column">
            <Grid item xs>
              <MaterialUI paperClass="paper-top">
                <TranslateDisplay
                  response={response}
                  responseVisable={responseVisable}
                />
              </MaterialUI>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
