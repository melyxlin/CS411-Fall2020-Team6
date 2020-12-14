import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import PropTypes from "prop-types";
import "../../styles/layout.css";

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
