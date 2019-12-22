import React from "react";
import "./style.css";
import { Input, FormBtn } from "../../components/input/index";
import API from "../../utils/API";

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
      <div>
        <h1>Welcome to Mapper!</h1>
        <h3> Login </h3>
        <Input val={this.state.username} onChange={this.handleChange} />
        <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
      </div>
    );
  }
}

export default Homepage;
