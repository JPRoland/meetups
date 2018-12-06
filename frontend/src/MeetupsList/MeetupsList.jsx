import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Meetup from "../Meetup";

const MEETUPS_QUERY = gql`
  query MEETUPS_QUERY {
    meetups {
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
`;

export default class MeetupsList extends Component {
  render() {
    return (
      <Query query={MEETUPS_QUERY}>
        {({ data, error, loading }) => {
          if (error) return <p>{error.message}</p>;
          if (loading) return <p>Loading...</p>;
          return (
            <div className="flex flex-wrap">
              {data.meetups.map(props => (
                <Meetup {...props} key={props.id} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
