import React from "react";
import "./style.css";
import { Input, FormBtn } from "../../components/Input";
import API from "../../utils/API";
import { Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

class Homepage extends React.Component {
  // set the username state to what is inside of the input field
  state = {
    username: "",
    password: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    var data = { username: this.state.username, password: this.state.password };
    console.log(data);
    API.authenticateUser(data).then(
      response => console.log(response)
      // response.data.length
      //   ? this.props.history.push(`/u/${response.data[0].username}`)
      //   : alert("No User Found!")
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
                name="username"
              />
              <Input
                val={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
                name="password"
                type="password"
              />
              <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
              <a href="/signup" style={{ color: "white" }}>
                Sign Up
              </a>
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}

export default Homepage;
