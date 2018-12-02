import React, { Component } from "react";

export default class Login extends Component {
  state = {
    password: "",
    email: ""
  };

  render() {
    return <h1 className="f1">Login Page!</h1>;
  }
}
