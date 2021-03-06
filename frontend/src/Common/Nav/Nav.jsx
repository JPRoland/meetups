import React from "react";
import { Link } from "react-router-dom";
import User from "../User";
import Search from "./Search";

import Signout from "../Signout";

export default props => {
  return (
    <User>
      {({ data: { me } }) => (
        <nav className="flex justify-between bb b--white-10 bg-black">
          <Link
            to="/"
            className="link white-70 hover-white no-underline flex items-center pa3"
          >
            <svg
              className="dib h1 w1"
              data-icon="grid"
              viewBox="0 0 32 32"
              style={{ fill: "currentcolor" }}
            >
              <title>Meetups</title>
              <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z" />
            </svg>
            <span className="ml2 f4">Meetups</span>
          </Link>
          <div className="flex-grow pa3 flex items-center">
            <Search />
            {me && (
              <div>
                <Link
                  to="/newMeetup"
                  className="f6 link dib white dim mr3 mr4-ns"
                >
                  Create a Meetup
                </Link>
                <Signout />
              </div>
            )}
            {!me && (
              <div>
                <Link to="/login" className="f6 link dib white dim mr3 mr4-ns">
                  Sign In
                </Link>
                <Link
                  className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </User>
  );
};
