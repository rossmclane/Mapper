import React from "react";
import UserMap from "./components/UserMap";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Homepage from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/";

export default function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/u/:username/" component={Dashboard} />
          <ProtectedRoute
            path="/u/:username/map/:usermapID"
            component={UserMap}
          />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
}
