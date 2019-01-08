import React, { Component } from "react";

import AllMeetups from "./AllMeetups";
import MyMeetups from "./MyMeetups";
import AttendingMeetups from "./AttendingMeetups";
import Sidebar from "../Sidebar";
import withPagination from "../Pagination";
import User from "../Common/User";

const LISTS = {
  allMeetups: withPagination("all")(AllMeetups),
  myMeetups: withPagination("my")(MyMeetups),
  attendingMeetups: withPagination("attending")(AttendingMeetups)
};

export default class MeetupListContainer extends Component {
  state = {
    listToDisplay: "allMeetups"
  };

  updateDisplayList = listToDisplay => {
    this.setState({ listToDisplay });
  };

  render() {
    const ListWithPagination = LISTS[this.state.listToDisplay];
    return (
      <User>
        {({ data: { me }, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <div className="flex h-100">
              <ListWithPagination userId={me.id} />
              <Sidebar
                updateDisplayList={this.updateDisplayList}
                userId={me.id}
              />
            </div>
          );
        }}
      </User>
    );
  }
}
