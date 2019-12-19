import React, { Component } from "react";
import "./App.css";
import RegionMap from "./components/map/RegionMap";
import CheckboxInput from "./components/checkboxInput/CheckboxInput";
import CheckboxContainer from "./components/checkboxContainer/CheckboxContainer";
import API from "./utils/API";

class App extends Component {
  state = {
    datasets: [
      { name: "density", checked: false },
      { name: "rainfall", checked: true }
    ]
  };

  // on component mount go to the database and grab all of the possible datasets
  // pass them to a checkbox component to be rendered
  // by default render at least one of them

  // When component mounts
  // Do an ajax request to /api/features
  // Get all of the datasets
  // setState to those datasets, by default all are true
  componentDidMount() {
    API.getFeatureCollection().then(response => {
      var datasetArray = Object.keys(
        response.data[0].features[0].properties
      ).filter(property => property !== "name");

      var datasets = datasetArray.map(dataset => {
        return {
          name: dataset,
          checked: true
        };
      });

      this.setState({
        datasets: datasets
      });
    });
  }

  // handleCheck function which will then set the app state
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

export default App;
