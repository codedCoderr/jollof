import React, { Component } from "react";
import "./App.css";

import Navigation from "./pages/Navigation";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";

class App extends Component {
  constructor() {
    super();

    this.state = {
      route: "",
      isSignedIn: false,
      user: {
        email: "",
        password: ""
      }
    };
  }

  // Func to save user
  saveUser = data => {
    this.setState({
      user: {
        email: data.email,
        password: data.password
      }
    });
  };

  onPageChange = route => {
    if (route === "success") {
      this.setState({ route: "success", isSignedIn: true });
    } else if (route === "fail") {
      this.setState({ route: "fail" });
    }
  };

  render() {
    const { route, isSignedIn } = this.state;
    if (route === "success") {
      return <Welcome />;
    } else if (route === "fail") {
      return (
        <Login saveUser={this.saveUser} onPageChange={this.onPageChange} />
      );
    } else if (route === "register") {
      return <Register />;
    }

    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onPageChange={this.onPageChange} />
      </div>
    );
  }
}

export default App;
