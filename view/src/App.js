import React, { Component } from "react";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: "",
        avatar: "",
        status: ""
      }
    };
  }

  // Func to save users details to state
  saveUser = data => {
    this.setState({
      user: {
        username: data.username,
        avatar: data.avatar,
        status: data.status
      }
    });
  };

  // Func to display welcome page if auth is authorized

  render() {
    return (
      <div className="App">
        {/* Will fix condition later */}
        <Welcome userDetails={this.state.user} />
        <Login saveUser={this.saveUser} />
      </div>
    );
  }
}

export default App;
