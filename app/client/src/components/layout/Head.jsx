import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Head(props) {
  const classes = useStyles();
  const auth = props.auth;

  const logout = () => {
    //Clears all cookies (logout endpoint handles loggedin)
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.href = "http://localhost:4000/logout";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TransTweeter
          </Typography>
          {auth && (
            <div>
              <Button component={Link} to="/">
                Main
              </Button>
              <Button component={Link} to="/History">
                History
              </Button>
              <Button onClick={() => logout()}>Log Out</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Head.propTypes = {
  auth: PropTypes.bool,
};
