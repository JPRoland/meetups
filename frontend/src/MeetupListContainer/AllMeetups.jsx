import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Meetup from "../Meetup";
import perPage from "../Constants";

const MEETUPS_QUERY = gql`
  query MEETUPS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    meetups(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
`;

export default class AllMeetups extends Component {
  render() {
    return (
      <div className="w-75">
        <h1 className="ml3 mb0">All Meetups</h1>
        <Query
          query={MEETUPS_QUERY}
          variables={{ skip: this.props.page * perPage - perPage }}
        >
          {({ data, error, loading }) => {
            if (error) return <p>{error.message}</p>;
            if (loading) return <p>Loading...</p>;
            return (
              <div className="flex flex-wrap mt0">
                {data.meetups.map(props => (
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
