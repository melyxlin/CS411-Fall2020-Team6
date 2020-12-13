import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import PropTypes from "prop-types";
import "../../styles/layout.css";

/**
 * @param {Object} props include children nodes and CSS class for Paper component
 * @return {ThemeProvider} wrapping children nodes in a Material UI theme
 */
export default function MaterialUI(props) {
  const { children, paperClass } = props;

  return (
    <div>
      <CssBaseline />
      <div className="root">
        <Paper className={paperClass}>{children}</Paper>
      </div>
    </div>
  );
}

MaterialUI.propTypes = {
  children: PropTypes.node,
  paperClass: PropTypes.string,
};
