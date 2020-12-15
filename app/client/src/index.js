import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { App, History, Login, Restricted, NoPage } from "./pages";

const routing = (
  <Router>
    <div>
      <Switch>
        {/* Only show main component if logged in, else shows login component*/}
        {Cookies.get("loggedin") === undefined ||
        Cookies.get("loggedin") === "false" ? (
          <Route path="/" component={Login} exact />
        ) : Cookies.get("loggedin") === "true" ? (
          <Route path="/" component={App} exact />
        ) : (
          <Route path="/" component={NoPage} exact />
        )}
         {/* Only show history component if logged in, else shows restricted component*/}
        {Cookies.get("loggedin") === undefined ||
        Cookies.get("loggedin") === "false" ? (
          <Route path="/History" component={Restricted} />
        ) : (
          <Route path="/History" component={History} />
        )}
        <Route component={NoPage} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
