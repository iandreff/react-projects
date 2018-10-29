import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const option = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, option);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(errors);
    return errors;
  };

  handlerSubmit = e => {
    e.preventDefault();
    /* const username = this.username.current.value; */
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //if errors is truthy then errors otherwise empty object {}
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //we destructuring argument e and use {currentTarget and renane as input}
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data: data, errors: errors });
    {
      /*we can use also this.setState({data}); */
    }
  };
}

export default Form;


