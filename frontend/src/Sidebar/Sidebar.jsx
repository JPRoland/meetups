import React from "react";

import "./sidebar.css";

export default props => {
  const lists = [
    {
      name: "All Meetups",
      listToDisplay: "allMeetups",
      id: 0
    },
    {
      name: "My Meetups",
      listToDisplay: "myMeetups",
      id: 1
    },
    {
      name: "Attending Meetups",
      listToDisplay: "attendingMeetups",
      id: 2
    }
  ];

  return (
    <aside className="sidebar mr4 mt4">
      <ul className="list pl0 center ba b--light-silver br2">
        {lists.map(list => (
          <li
            className="pa3 bb b--light-silver hover-bg-light-gray"
            key={list.id}
            onClick={e => {
              e.preventDefault();
              props.updateDisplayList(list.listToDisplay);
            }}
          >
            {list.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
