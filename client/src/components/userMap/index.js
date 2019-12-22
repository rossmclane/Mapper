import React, { Component } from "react";
import RegionMap from "../RegionMap";
import CheckboxInput from "../CheckboxInput";
import CheckboxContainer from "../CheckboxContainer";
import SaveButton from "../SaveButton";
import "./style.css";
import API from "../../utils/API";
import Jumbotron from "react-bootstrap/Jumbotron";
import Layout from "../Layout";

class UserMap extends Component {
  state = {
    username: "",
    datasets: [],
    featurecollectionID: "",
    usermapID: ""
  };

  componentDidMount = () => {
    var { usermapID, username } = this.props.match.params;

    API.getUserMap(usermapID).then(response => {
      var { datasets, featurecollectionID } = response.data[0];
      this.setState({
        datasets: datasets,
        featurecollectionID: featurecollectionID,
        username: username,
        usermapID: usermapID
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
      <Layout>
        <Jumbotron>
          <h1 id="heading">Mapper</h1>{" "}
          <RegionMap datasets={this.state.datasets} />
          <CheckboxContainer>
            <h3>Datasets</h3>
            {this.state.datasets.map(dataset => (
              <CheckboxInput
                dataset={dataset}
                handleChange={this.handleChange}
              />
            ))}
          </CheckboxContainer>
          <SaveButton state={this.state} />
        </Jumbotron>
      </Layout>
    );
  }
}

export default UserMap;
