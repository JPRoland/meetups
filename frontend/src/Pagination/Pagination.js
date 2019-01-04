import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import perPage from "../Constants";

const ALL_PAGINATION_QUERY = gql`
  query ALL_PAGINATION_QUERY {
    meetupsConnection {
      aggregate {
        count
      }
    }
  }
`;

const MY_PAGINATION_QUERY = gql`
  query MY_PAGINATION_QUERY($id: ID) {
    meetupsConnection(where: { organizer: { id: $id } }) {
      aggregate {
        count
      }
    }
  }
`;

const ATTENDING_PAGINATION_QUERY = gql`
  query ATTENDING_PAGINATION_QUERY($id: ID) {
    meetupsConnection(where: { attendees_some: { id: $id } }) {
      aggregate {
        count
      }
    }
  }
`;

export default props => (
  <Query
    query={
      props.listName === "attending"
        ? ATTENDING_PAGINATION_QUERY
        : props.listName === "my"
          ? MY_PAGINATION_QUERY
          : ALL_PAGINATION_QUERY
    }
    variables={{ id: props.id }}
  >
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const count = data.meetupsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;

      return <p>PAGES ARE AWESOME</p>;
    }}
  </Query>
);
