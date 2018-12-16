import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Meetup from "../Meetup";

const ATTENDING_MEETUPS_QUERY = gql`
  query {
    me {
      meetupsAttending {
        id
        title
        description
        location
        date
        organizer {
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
      <div className="w-75">
        <h1 className="ml3 mb0">Attending Meetups</h1>
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
