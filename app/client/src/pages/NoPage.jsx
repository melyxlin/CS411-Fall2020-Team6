import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import MaterialUI from "../components/layout/Material";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export default function NoPage() {
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
      <Head />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          <MaterialUI paperClass="paper-login">
            <Typography variant="h4" component="h2" gutterBottom>
              404 Error
            </Typography>
          </MaterialUI>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
