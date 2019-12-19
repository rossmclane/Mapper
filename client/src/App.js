import React, { Component } from "react";
import "./App.css";
import RegionMap from "./components/map/RegionMap";
import CheckboxInput from "./components/checkboxInput/CheckboxInput";
import CheckboxContainer from "./components/checkboxContainer/CheckboxContainer";

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

  // Then when there is a check in the check box (in checkbox component)
  // trigger a function up here which reloads the map with the correct datasets

  // Gets all datasets to display
  // getDatasets = () => {};

  // handleCheck function which will then set the app state
  handleChange = ({ target }) => {
    const { name, checked } = target;
    console.log(name, checked);

    this.setState(prevState => ({
      datasets: prevState.datasets.map(obj =>
        obj.name === name ? Object.assign(obj, { checked: checked }) : obj
      )
    }));

    // Not rerendering
    this.state.datasets.forEach(function(obj) {
      if (obj.name === name) {
        obj.checked = checked;
      }
    });

    console.log(this.state);

    // Change the state based on which is clicked
  };

  // renderMap

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
