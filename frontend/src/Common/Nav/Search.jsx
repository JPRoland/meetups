import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const MEETUP_SEARCH_QUERY = gql`
  query MEETUP_SEARCH_QUERY($searchTerm: String!) {
    meetups(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      title
      date
      location
    }
  }
`;

export default class Search extends Component {
  state = {
    meetups: [],
    loading: false
  };

  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}
