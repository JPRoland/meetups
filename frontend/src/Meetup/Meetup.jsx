import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import placeholder from "./placeholder.jpg";

export default props => {
  return (
    <div className="bg-white mw5 ba b--black-10 mv4 mh2">
      <Link to={`/meetup/${props.id}`} style={{ textDecoration: "none" }}>
        <div className="pv2 ph3">
          <h1 className="f5 tl black">
            {moment(props.date).format("MMMM Do YYYY")}
          </h1>
          <h2 className="f6 tl gray">{props.location}</h2>
        </div>
        <img src={placeholder} alt="meetup" className="db w-100" />
        <div className="pa3">
          <h1 className="f6 tl black">{props.title}</h1>
          <small className="gray db pv2 tl">
            Hosted by: <span className="ttu">{props.organizer.name}</span>
          </small>
          {props.attendees && (
            <small className="gray db tl">
              {props.attendees.length} attendee{props.attendees.length > 1 ? 's' : null}
            </small>
          )}
        </div>
      </Link>
    </div>
  );
};
