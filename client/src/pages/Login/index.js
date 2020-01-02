import React from "react";
import "./style.css";
import { Input, FormBtn } from "../../components/Input";
import Auth from "../../utils/Auth";
import { Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    // Auth.logIn will set the token in local storage
    if (username && password) {
      Auth.logIn(username, password, response =>
        this.props.history.push(`/u/${response.username}`)
      );
    }
  };

  render() {
    return (
      <div id="background">
        <Layout>
          <Row className="justify-content-center" style={{ height: "200px" }}>
            <h1 style={{ color: "white" }}>Welcome to Geograph!</h1>
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

export default Login;
