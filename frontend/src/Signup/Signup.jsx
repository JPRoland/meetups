import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "../Common/User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

export default class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <article className="pa4 black-80">
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signup();
                this.setState({ name: "", email: "", password: "" });
              }}
            >
              <fieldset
                disabled={loading}
                aria-busy={loading}
                className="ba b--transparent ph0 mh0"
              >
                <div className="mt3">
                  <label htmlFor="email" className="db fw4 lh-copy f6">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="pa2 input-reset ba bg-transparent w-100 measure"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </div>
                <div className="mt3">
                  <label htmlFor="name" className="db fw4 lh-copy f6">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="pa2 input-reset ba bg-transparent w-100 measure"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </div>

                <div className="mt3">
                  <label htmlFor="password" className="db fw4 lh-copy f6">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="pa2 input-reset ba bg-transparent w-100 measure"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </div>

                <div className="mt3">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                    type="submit"
                    value="Sign Up"
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

export { SIGNUP_MUTATION };
