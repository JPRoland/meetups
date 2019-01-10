import React, { Component } from "react";

import AllMeetups from "./AllMeetups";
import MyMeetups from "./MyMeetups";
import AttendingMeetups from "./AttendingMeetups";
import Sidebar from "../Sidebar";
import withPagination from "../Pagination";
import User from "../Common/User";

export default class MeetupListContainer extends Component {
  state = {
    listToDisplay: null
  };

  LISTS = {
    allMeetups: withPagination("all")(AllMeetups),
    myMeetups: withPagination("my")(MyMeetups),
    attendingMeetups: withPagination("attending")(AttendingMeetups)
  };

  updateDisplayList = listToDisplay => {
    this.setState({ listToDisplay: this.LISTS[listToDisplay] });
  };

  componentDidMount() {
    this.setState({ listToDisplay: this.LISTS.allMeetups });
  }

  render() {
    return (
      <User>
        {({ data: { me }, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <div className="flex h-100">
              {this.state.listToDisplay && (
                <this.state.listToDisplay userId={me.id} />
              )}
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
