import React, { Component } from "react";
import gql from "graphql-tag";
import Downshift, { resetIdCounter } from "downshift";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

import debounce from "../../utils";

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

const dropDownClasses = {
  highlighted: "bb bg-white pa2 flex items-center",
  normal: "bb bg-near-white pa2 flex items-center"
};

class Search extends Component {
  state = {
    meetups: [],
    loading: false
  };

  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });

    const res = await client.query({
      query: MEETUP_SEARCH_QUERY,
      variables: { searchTerm: e.target.value }
    });

    this.setState({
      meetups: res.data.meetups,
      loading: false
    });
  }, 350);

  routeToMeetup = meetup => {
    this.props.history.push(`/meetup/${meetup.id}`);
  };

  render() {
    resetIdCounter();
    return (
      <div>
        <Downshift
          onChange={this.routeToMeetup}
          itemToString={item => (item === null ? "" : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div className="relative">
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search for Meetups",
                      className: "mr3 pa2 input-reset ba",
                      id: "search",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <div className="z-1 abosolute">
                  {this.state.meetups.map((meetup, i) => (
                    <div
                      {...getItemProps({
                        item: meetup,
                        className:
                          highlightedIndex === i
                            ? dropDownClasses.highlighted
                            : dropDownClasses.normal
                      })}
                      key={meetup.id}
                    >
                      {meetup.title}
                    </div>
                  ))}
                  {!this.state.meetups.length &&
                    !this.state.loading && (
                      <div className={dropDownClasses.normal}>
                        Nothing found {inputValue}
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default withRouter(Search);
