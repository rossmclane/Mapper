import React from "react";
import UserMap from "./components/userMap/UserMap";
import Dashboard from "./pages/dashboard/Dashboard";
import NoMatch from "./pages/NoMatch/NoMatch";
import Homepage from "./pages/Homepage/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
