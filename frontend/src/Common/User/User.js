import { Query } from "react-apollo";
import React from "react";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      myMeetups {
        id
      }
      meetupsAttending {
        id
      }
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

export default User;
export { CURRENT_USER_QUERY };
