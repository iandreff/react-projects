import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: { username: "", password: "" }
  };
  // username = React.createRef();
  // WE DO NOT USE REF HERE BECAUSE WE WILL USE CONTROLED COMP

  schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Password")
  };

  validate = () => {
    const option = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, option);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(result);

    return errors;
  };

  handlerSubmit = e => {
    e.preventDefault();
    /* const username = this.username.current.value; */
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //if errors is truthy then errors otherwise empty object {}
    if (errors) return;
    console.log("Submitted");
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    //we destructuring argument e and use {currentTarget and renane as input}
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account, errors: errors });
    {
      /*we can use also this.setState({account}); */
    }
  };

  render() {
    const { account, errors } = this.state;
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
            error={errors.username}
          />
          <Input
            value={account.password}
            name="password"
            onChange={this.handleChange}
            label="Password"
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
