import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, CssBaseline } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import  Head from "../layout/Head";
import PropTypes from "prop-types";
import "../../styles/layout.css";


/**
 * @param {Object} props include children nodes and CSS class for Paper component
 * @return {ThemeProvider} wrapping children nodes in a Material UI theme
 */
export default function MaterialUI(props) {
    const { children, paperClass } = props;
  
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
        <CssBaseline />
        <Head />
        <div className="root">
          <Paper className={paperClass}>{children}</Paper>
        </div>
      </ThemeProvider>
    );
  }
  
  MaterialUI.propTypes = {
    children: PropTypes.node,
    paperClass: PropTypes.string,
  };