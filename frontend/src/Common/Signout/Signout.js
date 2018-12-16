import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CURRENT_USER_QUERY } from "../User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

export default props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <Link
        to="/"
        className="f6 link dib white dim mr3 mr4-ns"
        onClick={() => {
          signout();
          toast.success("Logged Out", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }}
      >
        Sign Out
      </Link>
    )}
  </Mutation>
);
