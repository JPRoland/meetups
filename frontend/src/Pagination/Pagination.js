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

// TODO - Prefetch query on hover to avoid loading screen
const Pagination = props => {
  return (
    <Query
      query={
        props.listName === "attending"
          ? ATTENDING_PAGINATION_QUERY
          : props.listName === "my"
            ? MY_PAGINATION_QUERY
            : ALL_PAGINATION_QUERY
      }
      variables={{ id: props.userId }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;
        const count = data.meetupsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        console.log(pages);

        return (
          <div className="flex items-center justify-center pt4 pr5 ml-auto">
            <a
              href="#0"
              onClick={e => {
                e.preventDefault();
                if (page <= 1) return;

                props.handlePrev();
              }}
              disabled={page <= 1}
              className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr3"
            >
              <svg
                className="w1"
                data-icon="chevronLeft"
                viewBox="0 0 32 32"
                style={{ fill: "currentcolor" }}
              >
                <title>chevronLeft icon</title>
                <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" />
              </svg>
              <span className="pl1">Previous</span>
            </a>
            <p>
              Page {props.page} of {pages}
            </p>
            <a
              href="#0"
              onClick={e => {
                e.preventDefault();
                if (page >= pages) return;

                props.handleNext();
              }}
              disabled={page >= pages}
              className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba ml3 border-box"
            >
              <span className="pr1">Next</span>
              <svg
                className="w1"
                data-icon="chevronRight"
                viewBox="0 0 32 32"
                style={{ fill: "currentcolor" }}
              >
                <title>chevronRight icon</title>
                <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
              </svg>
            </a>
          </div>
        );
      }}
    </Query>
  );
};

const withPagination = listName => BaseComponent => {
  return class WithPagination extends React.Component {
    state = {
      page: 1
    };

    handlePrev = () => {
      this.setState({ page: this.state.page - 1 });
    };
    handleNext = () => {
      this.setState({ page: this.state.page + 1 });
    };

    render() {
      return (
        <div className="w-75 ml4">
          <div className="flex items-end justify-start">
            <h1 className="ml3 mb0 ttc">{listName} Meetups</h1>
            <Pagination
              userId={this.props.userId}
              listName={listName}
              page={this.state.page}
              handlePrev={this.handlePrev}
              handleNext={this.handleNext}
            />
          </div>

          <BaseComponent page={this.state.page} />
        </div>
      );
    }
  };
};

export default withPagination;
