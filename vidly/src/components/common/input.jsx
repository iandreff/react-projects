import React from "react";

const input = ({ value, name, onChange, label }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        onChange={onChange}
        autoFocus
        //ref={this.username}
        id={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default input;

/**
 * ?
 */
