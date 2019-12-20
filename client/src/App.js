import React from "react";
import "./App.css";
import UserMap from "./components/userMap/UserMap";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Switch>
      <Route exact path="/u/:username/" component={Dashboard} />
      <Route exact path="/u/:username/map/:usermapID" component={UserMap} />
    </Switch>
  );
}
