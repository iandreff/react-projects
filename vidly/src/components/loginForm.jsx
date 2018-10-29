import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handlerSubmit}>
          {/*  add id to Input, same value in id is set in htmlFor */}
          <Input //this  has to be the same name used when import and the same of the "C"omponent "Warning"
            value={data.username}
            name="username"
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            value={data.password}
            name="password"
            onChange={this.handleChange}
            label="Password"
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
