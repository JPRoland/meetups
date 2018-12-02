import React, { Component } from "react";

export default class Signup extends Component {
  state = {
    name: "",
    password: "",
    passwordConfirm: "",
    email: ""
  };

  render() {
    return <h1 className="f1">Signup Page!</h1>;
  }
}
