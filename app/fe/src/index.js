import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Login from "./pages/Login"
import History from "./pages/History"

const routing = (
  <Router>
  <div>
            <Switch>
             <Route path="/" component={App} exact/>
             <Route path="/Login" component={Login}/>
             <Route path="/History" component={History}/>
            <Route component={Error}/>
           </Switch>
        </div> 
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
