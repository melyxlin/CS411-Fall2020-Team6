import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

/**
 * @return {AppBar} with Google Cloud logo
 */
export default function Head() {
  return (
    <AppBar className="header">
      <Typography variant="h6">TransTweeter</Typography>
    </AppBar>
  );
}
