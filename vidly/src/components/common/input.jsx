import React from "react";

const input = ({ value, name, onChange, label, error }) => {
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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
    
  );
};

export default input;

/**
 * ?
 */
