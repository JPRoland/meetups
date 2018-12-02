import React from "react";
import moment from "moment";
import placeholder from "./placeholder.jpg";

export default props => {
  return (
    <div className="bg-white mw5 ba b--black-10 mv4 mh2">
      <div className="pv2 ph3">
        <h1 className="f5 tl">{moment(props.date).format("MMMM Do YYYY")}</h1>
        <h2 className="f6 tl">{props.location}</h2>
      </div>
      <img src={placeholder} alt="meetup" className="db w-100" />
      <div className="pa3">
        <h1 className="f6 tl">{props.title}</h1>
        <small className="gray db pv2 tl">
          Hosted by: <span className="ttu">{props.organizer}</span>
        </small>
        {props.attendees && (
          <small className="gray db tl">
            {props.attendees.length} attendees
          </small>
        )}
      </div>
    </div>
  );
};
