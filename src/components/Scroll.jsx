import React, { Component } from "react";

const Scroll = (props) => {
  return (
    <div className="scroll" style={{ overflowY: 'scroll', height: window.outerHeight - 200 }}>
      {props.children}
    </div>
  );
}

export default Scroll;
