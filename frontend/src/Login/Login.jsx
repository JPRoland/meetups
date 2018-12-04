import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "../graphql/User";

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default class Login extends Component {
  state = {
    password: "",
    email: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(login, { error, loading }) => (
          <article className="pa4 black-80">
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await login();
                this.setState({ email: "", password: "" });
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
                    className="pa2 input-reset ba bg-transparent w-100 measure"
                    placeholder="email"
                    value={this.state.email}
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
              </fieldset>
              <div className="mt3">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
          </article>
        )}
      </Mutation>
    );
  }
}
