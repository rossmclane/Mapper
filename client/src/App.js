import React from "react";
import "./App.css";
import UserMap from "./components/userMap/UserMap";
import Dashboard from "./components/dashboard/Dashboard";
import NoMatch from "./components/NoMatch/NoMatch";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/u/:username/" component={Dashboard} />
        <Route path="/u/:username/map/:usermapID" component={UserMap} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}
