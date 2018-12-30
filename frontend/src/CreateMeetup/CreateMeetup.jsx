import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import DateTime from "react-datetime";
import moment from "moment";

const CREATE_MEETUP_MUTATION = gql`
  mutation CREATE_MEETUP_MUTATION(
    $title: String!
    $description: String!
    $location: String!
    $date: DateTime!
  ) {
    createMeetup(
      title: $title
      description: $description
      location: $location
      date: $date
    ) {
      id
    }
  }
`;

export default class CreateMeetup extends Component {
  state = {
    title: "",
    description: "",
    location: "",
    date: moment().toDate()
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDatePick = date => {
    this.setState({ date: date.toDate() });
  };

  render() {
    return (
      <Mutation mutation={CREATE_MEETUP_MUTATION} variables={this.state}>
        {(createMeetup, { error, loading }) => (
          <article className="pa4 black-80">
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await createMeetup();
                this.setState({ name: "", email: "", password: "" });
                this.props.history.push(`/meetup/${res.data.createMeetup.id}`);
              }}
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
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="mt3">
                  <label htmlFor="description" className="db fw4 lh-copy f6">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description..."
                    className="db border-box hover-black w-100 measure ba pa2 br2 mb2"
                    value={this.state.description}
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
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="mt3">
                  <label htmlFor="date" className="db fw4 lh-copy f6">
                    Date
                  </label>
                  <DateTime
                    name="date"
                    value={this.state.date}
                    inputProps={{
                      className:
                        "pa2 input-reset ba bg-transparent w-100 measure"
                    }}
                    onChange={this.handleDatePick}
                  />
                </div>

                <div className="mt3">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                    type="submit"
                    value="Create Meetup"
                  />
                </div>
              </fieldset>
            </form>
          </article>
        )}
      </Mutation>
    );
  }
}
