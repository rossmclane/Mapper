import React, { Component } from "react";
import RegionMap from "../regionMap/RegionMap";
import CheckboxInput from "../checkboxInput/CheckboxInput";
import CheckboxContainer from "../checkboxContainer/CheckboxContainer";
import SaveButton from "../saveButton/SaveButton";
import "./style.css";
import API from "../../utils/API";

class UserMap extends Component {
  state = {
    username: "",
    datasets: [],
    featureCollection: "",
    mapID: ""
  };

  componentDidMount = () => {
    var { usermapID, username } = this.props.match.params;

    API.getUserMap(usermapID).then(response => {
      var { Datasets, FeatureCollection } = response.data[0];
      this.setState({
        datasets: Datasets,
        featureCollection: FeatureCollection,
        username: username,
        mapID: usermapID
      });

      console.log(this.state);
    });
  };

  handleChange = ({ target }) => {
    const { name, checked } = target;
    console.log(name, checked);

    this.setState(prevState => ({
      datasets: prevState.datasets.map(obj =>
        obj.name === name ? Object.assign(obj, { checked: checked }) : obj
      )
    }));
    console.log(this.state);
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
        <SaveButton state={this.state} />
      </div>
    );
  }
}

export default UserMap;
