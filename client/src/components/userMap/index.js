import React, { Component } from "react";
import RegionMap from "../RegionMap";
import CheckboxInput from "../CheckboxInput";
import CheckboxContainer from "../CheckboxContainer";
import SaveButton from "../SaveButton";
import "./style.css";
import API from "../../utils/API";
import Layout from "../Layout";
import { Row, Col } from "react-bootstrap";

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
        <Row>
          <Col className="content-justified-center" md={{ span: 4, offset: 4 }}>
            <h1 style={{ textAlign: "center", padding: "5px" }}>Your Map</h1>
          </Col>
        </Row>
        <Row style={{ height: "600px" }}>
          <Col md={{ span: 8, offset: 2 }}>
            <RegionMap datasets={this.state.datasets} />
          </Col>
          <Col md={2}>
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
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default UserMap;
