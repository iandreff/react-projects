import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: { username: "", password: "", name: "" }
  };

  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(3)
      .max(20)
      .required()
      .label("Username"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .label("Password"),
    name: Joi.string()
      .regex(/^[a-zA-Z]{3,30}$/)
      .label("Name")
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
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handlerSubmit}>
          {/*  add id to Input, same value in id is set in htmlFor */}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
