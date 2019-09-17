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
        email: ""
      }
    };
  }

  // Func to save users details to state
  saveUser = data => {
    this.setState({
      user: {
        email: data.email
      }
    });
  };

  // Func to display welcome page if auth is authorized
  onPageChange = route => {
    if (route === "success") {
      this.setState({ route: "success" });
    } else if (route === "signin") {
      this.setState({ route: "sigin" });
    } else if (route === "signout") {
      this.setState({ route: "signout" });
    }
  };

  render() {
    const { route } = this.state;
    // if (route === "success") {
    //   return <Welcome />;
    // } else if (route === "signin") {
    //   return (
    //     <Login onPageChange={this.onPageChange} saveUser={this.saveUser} />
    //   );
    // } else {
    //   <Register />;
    // }
    return (
      <div className="App">
        <Login onPageChange={this.onPageChange} saveUser={this.saveUser} />
      </div>
    );
  }
}

export default App;
