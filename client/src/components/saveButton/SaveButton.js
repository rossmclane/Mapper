import React, { Component } from "react";
import API from "../../utils/API";

export default class SaveButton extends Component {
  handleClick = () => {
    var postObject = {
      FeatureCollectionID: this.props.state.featureCollection,
      Datasets: this.props.state.datasets
    };

    API.postUserMap(postObject).then(response => console.log(response));
  };

  render() {
    return <button onClick={this.handleClick}>Save</button>;
  }
}
