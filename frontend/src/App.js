import React, { Component } from "react";

import MeetupsList from "./MeetupsList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MeetupsList />
      </div>
    );
  }
}

export default App;
