import React, { Component } from "react";

import AllMeetups from "./AllMeetups";
import MyMeetups from "./MyMeetups";
import AttendingMeetups from "./AttendingMeetups";
import Sidebar from "../Sidebar";

const ENUM = {
  allMeetups: <AllMeetups />,
  myMeetups: <MyMeetups />,
  attendingMeetups: <AttendingMeetups />
};

export default class MeetupListContainer extends Component {
  state = {
    meetups: [],
    listToDisplay: "allMeetups"
  };

  updateDisplayList = listToDisplay => {
    this.setState({ listToDisplay });
  };

  render() {
    return (
      <div className="flex h-100">
        {ENUM[this.state.listToDisplay]}
        <Sidebar updateDisplayList={this.updateDisplayList} />
      </div>
    );
  }
}
