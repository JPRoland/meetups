import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Meetup from "../Meetup";
import perPage from "../Constants";

const MY_MEETUPS_QUERY = gql`
  query MY_MEETUPS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    me {
      id
      myMeetups(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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

export default class MyMeetups extends Component {
  render() {
    return (
      <div>
        <Query
          query={MY_MEETUPS_QUERY}
          variables={{ skip: this.props.page * perPage - perPage }}
        >
          {({ data, error, loading }) => {
            if (error) return <p>{error.message}</p>;
            if (loading) return <p>Loading...</p>;
            return (
              <div className="flex flex-wrap mt0">
                {data.me.myMeetups.map(props => (
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
