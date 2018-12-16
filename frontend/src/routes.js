import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import CreateMeetup from "./CreateMeetup";
import SingleMeetup from "./SingleMeetup";
import MeetupListContainer from "./MeetupListContainer";

export default (
  <Switch>
    <Route exact path="/" component={MeetupListContainer} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/newMeetup" component={CreateMeetup} />
    <Route path="/meetup/:id" component={SingleMeetup} />
  </Switch>
);
