import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";

// The dashboard component should have an h1 with the current username
// It should also have a number of links associated with that users maps

export default class Dashboard extends Component {
  state = {
    username: "",
    usermapIDs: []
  };

  componentDidMount = () => {
    var username = this.props.match.params.username;

    // Do an api call to api/user/:username
    // Get all of the ids for that users maps
    // Create links to each of those maps
    // Where the link is from react router which goes to /u/:username/map/:usermapID
    API.getUser(username).then(response => {
      var usermapIDs = response.data[0].usermaps;
      this.setState({
        username: username,
        usermapIDs: usermapIDs
      });
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        {this.state.usermapIDs.map(usermapID => (
          <div>
            <Link to={`/u/${this.state.username}/map/${usermapID}`}>
              {usermapID}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
