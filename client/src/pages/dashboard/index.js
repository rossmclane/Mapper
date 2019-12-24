import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class Dashboard extends Component {
  state = {
    username: "",
    usermapIDs: []
  };

  componentDidMount = () => {
    var username = this.props.match.params.username;

    API.getUser(username).then(response => {
      var usermapIDs = response.data.usermapIDs;
      this.setState({
        username: username,
        usermapIDs: usermapIDs
      });
    });
  };

  handleNewMap = () => {
    var username = this.state.username;
    var mapData = {
      featurecollectionID: "5dfb8efca0ed4346d764ffa6",
      datasets: [
        { name: "density", checked: false },
        { name: "rainfall", checked: false }
      ]
    };

    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    API.postUserMap(username, mapData, config).then(response => {
      var usermapIDs = response.data.usermapIDs;
      var usermapID = usermapIDs[usermapIDs.length - 1];

      this.props.history.push(`/u/${username}/map/${usermapID}`);
    });
  };

  render() {
    return (
      <Jumbotron>
        <div>
          <h1>Hi, {this.state.username}!</h1>

          {this.state.usermapIDs.map(usermapID => (
            <div>
              <Link to={`/u/${this.state.username}/map/${usermapID}`}>
                {usermapID}
              </Link>
            </div>
          ))}
          <button onClick={this.handleNewMap}> Create a new map </button>
        </div>
      </Jumbotron>
    );
  }
}
