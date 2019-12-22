import React from "react";
import { Input, FormBtn } from "../../components/Input";
import API from "../../utils/API";
import { Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

class Signup extends React.Component {
  state = {
    username: ""
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({ username: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var username = this.state.username;
    API.postUser(username).then(response =>
      this.props.history.push(`/u/${response.data.username}`)
    );
  };

  render() {
    return (
      <div id="background">
        <Layout>
          <Row className="justify-content-center" style={{ height: "200px" }}>
            <h1 style={{ color: "white" }}>Welcome to Placeholder!</h1>
          </Row>
          <Row className="justify-content-between" style={{ height: "500px" }}>
            <Col md={{ span: 4, offset: 4 }}>
              <h3 style={{ color: "white" }}> Sign Up </h3>
              <Input
                val={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              <Input placeholder="Password" />
              <Input placeholder="Password" />
              <FormBtn onClick={this.handleSubmit}>Sign Up</FormBtn>
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}

export default Signup;
