import React, { Component } from "react";
import API from "../../utils/API";

export default class SaveButton extends Component {
  handleClick = () => {
    var usermapID = this.props.state.usermapID;
    var datasets = this.props.state.datasets;
    API.updateUserMap(usermapID, datasets).then(response =>
      console.log(response.data)
    );
  };

  render() {
    return <button onClick={this.handleClick}>Save</button>;
  }
}
