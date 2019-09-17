import React, { Component } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      route: "",
      user: {
        username: "",
        avatar:
          "https://res.cloudinary.com/busola/image/upload/v1568640962/bee.jpg",
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
  onPageChange = route => {
    if (route === "success") {
      this.setState({ route: "success" });
    } else if (route === "signin") {
      this.setState({ route: "sigin" });
    }
  };

  render() {
    const { route } = this.state;
    return (
      <div className="App">
        {route === "success" ? (
          <Welcome userDetails={this.state.user} />
        ) : route === "signin" ? (
          <Login onPageChange={this.onPageChange} saveUser={this.saveUser} />
        ) : (
          <Register />
        )}
      </div>
    );
  }
}

export default App;
