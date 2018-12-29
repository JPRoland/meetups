import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import moment from "moment";

const MEETUP_QUERY = gql`
  query MEETUP_QUERY($id: ID!) {
    meetup(where: { id: $id }) {
      id
      title
      description
      location
      date
    }
  }
`;

const UPDATE_MEETUP_MUTATION = gql`
  mutation UPDATE_MEETUP_MUTATION(
    $title: String
    $description: String
    $location: String
    $date: DateTime
  ) {
    updateMeetup(
      title: $title
      description: $description
      location: $location
      date: $date
    ) {
      id
    }
  }
`;

export default class EditMeetup extends Component {
  state = {
    date: moment()
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  updateMeetup = async (e, updateMutation) => {
    e.preventDefault();
    const res = await updateMutation({
      variables: {
        id: this.props.match.params.id,
        ...this.state
      }
    });
    this.props.history.push(`/meetup/${res.data.updateMeetup.id}`);
  };

  handleDatePick = date => this.setState({ date });

  render() {
    return (
      <Query
        query={MEETUP_QUERY}
        variables={{ id: this.props.match.params.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.meetup) return <p>No meetup found</p>;

          return (
            <Mutation mutation={UPDATE_MEETUP_MUTATION} variables={this.state}>
              {(updateMeetup, { loading, error }) => (
                <article className="pa4 black-80">
                  <form
                    method="post"
                    onSubmit={e => this.updateMeetup(e, updateMeetup)}
                  >
                    <fieldset
                      disabled={loading}
                      aria-busy={loading}
                      className="ba b--transparent ph0 mh0"
                    >
                      <div className="mt3">
                        <label htmlFor="title" className="db fw4 lh-copy f6">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          className="pa2 input-reset ba bg-transparent w-100 measure"
                          value={data.meetup.title}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="mt3">
                        <label
                          htmlFor="description"
                          className="db fw4 lh-copy f6"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="Description..."
                          className="db border-box hover-black w-100 measure ba pa2 br2 mb2"
                          value={data.meetup.description}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="mt3">
                        <label htmlFor="location" className="db fw4 lh-copy f6">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          placeholder="Location"
                          className="pa2 input-reset ba bg-transparent w-100 measure"
                          value={data.meetup.location}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="mt3">
                        <label htmlFor="date" className="db fw4 lh-copy f6">
                          Date
                        </label>
                        <DatetimePickerTrigger
                          name="date"
                          className="w-100 measure"
                          moment={moment(data.meetup.date)}
                          onChange={this.handleDatePick}
                        >
                          <input
                            type="text"
                            className="w-100 measure"
                            value={moment(data.meetup.date).format(
                              "YYYY-MM-DD HH:mm"
                            )}
                            readOnly
                          />
                        </DatetimePickerTrigger>
                      </div>

                      <div className="mt3">
                        <input
                          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                          type="submit"
                          value="Edit Meetup"
                        />
                      </div>
                    </fieldset>
                  </form>
                </article>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
