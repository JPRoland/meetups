import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Meetup from "../Meetup";
import perPage from "../Constants";

const ATTENDING_MEETUPS_QUERY = gql`
  query ATTENDING_MEETUPS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    me {
      id
      meetupsAttending(first: $first, skip: $skip, orderBy: createdAt_DESC) {
        id
        title
        description
        location
        date
        organizer {
          id
          name
        }
        attendees {
          id
          name
        }
      }
    }
  }
`;

export default class AttendingMeetups extends Component {
  render() {
    return (
      <div>
        <Query query={ATTENDING_MEETUPS_QUERY}>
          {({ data, error, loading }) => {
            if (error) return <p>{error.message}</p>;
            if (loading) return <p>Loading...</p>;
            return (
              <div className="flex flex-wrap mt0">
                {data.me.meetupsAttending.map(props => (
                  <Meetup {...props} key={props.id} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
