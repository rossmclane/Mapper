import React from "react";
import "./App.css";
import UserMap from "./components/userMap/UserMap";
import { BrowserRouter as Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Switch>
      {/* <Route path="/u/:username/" component={} /> */}
      <Route path="/u/:username/map/:usermapID" component={UserMap} />
    </Switch>
  );
}
