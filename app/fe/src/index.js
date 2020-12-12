import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import {App, History, Login, Restricted, NoPage} from "./pages"

const routing = (
  <Router>
    <div>
      <Switch>
       { localStorage.getItem('loggedin') === null || localStorage.getItem('loggedin') === 'false' ? (<Route path="/" component={Login} exact />) : (<Route path="/" component={App} exact />)} 
        { localStorage.getItem('loggedin') === null || localStorage.getItem('loggedin') === 'false' ? ( <Route path="/History" component={Restricted} />) : ( <Route path="/History" component={History} />)} 
        <Route component={NoPage} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
