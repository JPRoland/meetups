import React from "react";

export default props => {
  return (
    <div className="mw6">
      {props.attendees.length > 0 &&
        props.attendees.map(attendee => {
          const [firstName, lastName] = attendee.name.split(" ");
          return (
            <div className="dt w-100 bb b--black-05 pb2 mt2" key={attendee.id}>
              <div className="dtc w2 w3-ns v-mid">
                <img
                  className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"
                  src="http://i.pravatar.cc/100"
                  alt={attendee.name}
                />
              </div>
              <div className="dtc v-mid pl3">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">
                  {firstName} {lastName[0]}.
                </h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
