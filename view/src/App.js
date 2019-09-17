import React, { Component } from "react";
import "./App.css";
import Login from "./pages/Login";

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

  render() {
    return (
      <div className="App">
        <Login saveUser={this.saveUser} />
      </div>
    );
  }
}

export default App;
