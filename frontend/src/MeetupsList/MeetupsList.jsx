import React, { Component } from "react";
import moment from "moment";

import Meetup from "../Meetup";

// TODO Query data with Graphql

export default class MeetupsList extends Component {
  render() {
    const meetups = [
      {
        id: 1,
        title: "Title 1",
        location: "New York, NY",
        date: moment().add(10, "days"),
        organizer: "John Smith",
        attendees: ["John", "Max", "Samantha"]
      },
      {
        id: 2,
        title: "Title 2",
        location: "Las Vegas, NV",
        date: moment().add(7, "days"),
        organizer: "Abe Lincoln",
        attendees: ["John", "Max", "Samantha"]
      },
      {
        id: 3,
        title: "Title 3",
        location: "San Francisco, CA",
        date: moment().add(2, "days"),
        organizer: "Zuck",
        attendees: []
      },
      {
        id: 4,
        title: "Title 4",
        location: "New York, NY",
        date: moment().add(30, "days"),
        organizer: "John Smith",
        attendees: ["John", "Max", "Samantha"]
      }
    ];
    return (
      <div className="flex flex-wrap">
        {meetups.map(props => {
          return <Meetup {...props} key={props.id} />;
        })}
      </div>
    );
  }
}
