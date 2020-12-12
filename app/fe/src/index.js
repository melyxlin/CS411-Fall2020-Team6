import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./Login"
import History from "./History"

ReactDOM.render(
  <Router>
  <div>
            <Switch>
             <Route path="/" component={App} exact/>
             <Route path="/Login" component={Login}/>
             <Route path="/History" component={History}/>
            <Route component={Error}/>
           </Switch>
        </div> 
  </Router>,
  document.getElementById("root")
);
