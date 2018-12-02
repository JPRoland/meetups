import React, { Component } from "react";

import MeetupsList from "./MeetupsList";
import Nav from "./Common/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <MeetupsList />
      </div>
    );
  }
}

export default App;
