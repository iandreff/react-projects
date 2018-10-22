import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };
  // username = React.createRef();
  // WE DO NOT USE REF HERE BECAUSE WE WILL USE CONTROLED COMP

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handlerSubmit = e => {
    e.preventDefault();
    /* const username = this.username.current.value; */
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
    if (errors) return;
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    //we destructuring argument e and use {currentTarget and renane as input}
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account });
    {
      /*we can use also this.setState({account}); */
    }
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handlerSubmit}>
          {/*  add id to Input, same value in id is set in htmlFor */}
          <Input //this  has to be the same name used when import and the same of the "C"omponent "Warning"
            value={account.username}
            name="username"
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            value={account.password}
            name="password"
            onChange={this.handleChange}
            label="Password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
