import React, { Component } from "react";
import RegionMap from "../regionMap/RegionMap";
import CheckboxInput from "../checkboxInput/CheckboxInput";
import CheckboxContainer from "../checkboxContainer/CheckboxContainer";
import "./style.css";
import API from "../../utils/API";

class UserMap extends Component {
  state = {
    user: "Ross",
    datasets: [
      { name: "density", checked: false },
      { name: "rainfall", checked: true }
    ],
    featureCollection: "String"
  };

  componentDidMount() {
    API.getFeatureCollection().then(response => {
      var datasetArray = Object.keys(
        response.data[0].features[0].properties
      ).filter(property => property !== "name");

      var datasets = datasetArray.map(dataset => {
        return {
          name: dataset,
          checked: false
        };
      });

      this.setState({
        datasets: datasets
      });
    });
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    console.log(name, checked);

    this.setState(prevState => ({
      datasets: prevState.datasets.map(obj =>
        obj.name === name ? Object.assign(obj, { checked: checked }) : obj
      )
    }));
  };

  render() {
    return (
      <div>
        <h1 id="heading">Mapper</h1>{" "}
        <RegionMap datasets={this.state.datasets} />
        <CheckboxContainer>
          <h3>Datasets</h3>
          {this.state.datasets.map(dataset => (
            <CheckboxInput dataset={dataset} handleChange={this.handleChange} />
          ))}
        </CheckboxContainer>
      </div>
    );
  }
}

export default UserMap;
