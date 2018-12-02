import React, { Component } from "react";

export default class CreateMeetup extends Component {
  state = {
    title: "",
    description: "",
    location: "",
    date: ""
  };

  render() {
    return <h1 className="f1">Create Meetup Page!</h1>;
  }
}
