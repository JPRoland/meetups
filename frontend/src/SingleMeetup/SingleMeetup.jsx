import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const MEETUP_QUERY = gql`
  query MEETUP_QUERY($id: ID!) {
    meetup(where: { id: $id }) {
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

export default class SingleMeetup extends Component {
  render() {
    return (
      <Query
        query={MEETUP_QUERY}
        variables={{ id: this.props.match.params.id }}
      >
        {({ error, loading, data }) => {
          console.log(data);
          if (error) return <p>{error.message}</p>;
          if (loading) return <p>Loading...</p>;
          if (!data.meetup) return <p>No meetup found</p>;

          return (
            <div>
              <p>{data.meetup.title}</p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export { MEETUP_QUERY };
