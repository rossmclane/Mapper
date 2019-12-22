import React from "react";
import "./style.css";
import { Input, FormBtn } from "../../components/Input";
import API from "../../utils/API";
import { Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

class Homepage extends React.Component {
  // set the username state to what is inside of the input field
  state = {
    username: ""
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({ username: value });
  };

  // onSubmit, take the username and create a post to the db
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
              <h3 style={{ color: "white" }}> Login </h3>
              <Input
                val={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              <Input
                val={this.state.username}
                onChange={this.handleChange}
                placeholder="Password"
              />
              <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}

export default Homepage;
