import React, { Component } from "react";
import { adopt } from "react-adopt";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import moment from "moment";
import User from "../Common/User";
import AttendeeList from "./AttendeeList";

const MEETUP_QUERY = gql`
  query MEETUP_QUERY($id: ID!) {
    meetup(where: { id: $id }) {
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

const ATTENDING_MUTATION = gql`
  mutation ATTENDING_MUTATION($id: ID!) {
    attending(id: $id) {
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

const NOT_ATTENDING_MUTATION = gql`
  mutation NOT_ATTENDING_MUTATION($id: ID!) {
    notAttending(id: $id) {
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

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>
});

export default class SingleMeetup extends Component {
  attendMeetup = async (e, attendMutation) => {
    e.preventDefault();
    await attendMutation({
      variables: {
        id: this.props.match.params.id
      }
    });
  };

  notAttendingMeetup = async (e, notAttendingMutation) => {
    e.preventDefault();
    await notAttendingMutation({
      variables: {
        id: this.props.match.params.id
      }
    });
  };

  render() {
    return (
      <Composed>
        {({ user }) => (
          <Query
            query={MEETUP_QUERY}
            variables={{ id: this.props.match.params.id }}
          >
            {({ error, loading, data }) => {
              if (error) return <p>{error.message}</p>;
              if (loading) return <p>Loading...</p>;
              if (!data.meetup) return <p>No meetup found</p>;

              return (
                <section className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
                  <div>
                    <h1>{data.meetup.title}</h1>
                    <p>Organized by {data.meetup.organizer.name}</p>
                  </div>

                  <hr />
                  <div>
                    <div>
                      <h2>Details</h2>
                      {user.data.me &&
                      user.data.me.id === data.meetup.organizer.id ? (
                        <Link to={`/meetup/${this.props.match.params.id}/edit`}>
                          Edit Meetup
                        </Link>
                      ) : null}
                    </div>

                    <p>{data.meetup.description}</p>
                  </div>

                  <div>
                    <p>
                      {moment(data.meetup.date).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </p>
                  </div>

                  <div>
                    <h2>Are you going?</h2>
                    <div>
                      {data.meetup.attendees.some(x => {
                        return user.data.me && x.name === user.data.me.name;
                      }) ? (
                        <Mutation mutation={NOT_ATTENDING_MUTATION}>
                          {(notAttending, { loading, error }) => {
                            if (loading) return <p>Loading...</p>;

                            return (
                              <div>
                                <div
                                  className="f6 link dim ph3 pv2 mb2 dib white bg-blue"
                                  onClick={e =>
                                    this.notAttendingMeetup(e, notAttending)
                                  }
                                >
                                  Not Attending
                                </div>
                                {error && <p>{error.message}</p>}
                              </div>
                            );
                          }}
                        </Mutation>
                      ) : (
                        <Mutation mutation={ATTENDING_MUTATION}>
                          {(attending, { loading, error }) => {
                            if (loading) return <p>Loading...</p>;

                            return (
                              <div>
                                <div
                                  className="f6 link dim ph3 pv2 mb2 dib white bg-blue"
                                  onClick={e => this.attendMeetup(e, attending)}
                                >
                                  Attending
                                </div>
                                {error && <p>{error.message}</p>}
                              </div>
                            );
                          }}
                        </Mutation>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2>
                      Attendees(
                      {data.meetup.attendees.length})
                    </h2>
                    <AttendeeList attendees={data.meetup.attendees} />
                  </div>
                </section>
              );
            }}
          </Query>
        )}
      </Composed>
    );
  }
}

export { MEETUP_QUERY };
