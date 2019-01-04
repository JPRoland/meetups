import React, { Component } from "react";

import AllMeetups from "./AllMeetups";
import MyMeetups from "./MyMeetups";
import AttendingMeetups from "./AttendingMeetups";
import Sidebar from "../Sidebar";

const LISTS = {
  allMeetups: props => <AllMeetups {...props} />,
  myMeetups: props => <MyMeetups {...props} />,
  attendingMeetups: props => <AttendingMeetups {...props} />
};

export default class MeetupListContainer extends Component {
  state = {
    page: 1,
    listToDisplay: "allMeetups"
  };

  updateDisplayList = listToDisplay => {
    this.setState({ listToDisplay });
  };

  render() {
    return (
      <div className="flex h-100">
        {LISTS[this.state.listToDisplay]({ page: this.state.page })}
        <Sidebar updateDisplayList={this.updateDisplayList} />
      </div>
    );
  }
}
