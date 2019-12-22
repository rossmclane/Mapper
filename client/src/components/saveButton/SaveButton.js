import React, { Component } from "react";
import API from "../../utils/API";

export default class SaveButton extends Component {
  handleClick = () => {
    var userMapID = this.props.state.mapID;
    var datasets = this.props.state.datasets;
    API.updateUserMap(userMapID, datasets).then(response =>
      console.log(response.data)
    );
  };

  render() {
    return <button onClick={this.handleClick}>Save</button>;
  }
}
