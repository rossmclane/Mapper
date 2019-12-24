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
    this.setState({ username: username });
    API.getUser(username).then(response => {
      var usermapIDs = response.data.usermapIDs;
      this.setState({
        usermapIDs: usermapIDs
      });
    });
  };

  handleNewMap = () => {
    var mapData = {
      featurecollectionID: "5dfb8efca0ed4346d764ffa6",
      datasets: [
        { name: "density", checked: false },
        { name: "rainfall", checked: false }
      ]
    };

    API.postUserMap(mapData).then(response => {
      let username = this.state.username;
      let usermapID = response.data._id;
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
