import React from "react";

const input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        //ref={this.username}
        name={name}
        id={name}
        autoFocus
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default input;

/**
 * ?
 */
