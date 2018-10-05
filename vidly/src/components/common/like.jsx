import React, { Component } from "react";

// Input: liked: boolean
//Output: OnClick event
// this is a stateless component

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
    />
  );
};

export default Like;
