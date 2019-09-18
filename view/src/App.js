import React, { Component } from "react";
import "./App.css";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";

class App extends Component {
  constructor() {
    super();

    this.state = {
      route: "",
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
      this.setState({ route: "success" });
    } else if (route === "fail") {
      this.setState({ route: "fail" });
    }
  };

  render() {
    const { route } = this.state;
    if (route === "success") {
      return <Welcome />;
    } else if (route === "fail") {
      return <Register />;
    }
    return (
      <div className="App">
        <Login saveUser={this.saveUser} onPageChange={this.onPageChange} />
      </div>
    );
  }
}

export default App;
