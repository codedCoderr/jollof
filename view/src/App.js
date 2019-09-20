import React, { Component } from "react";
import "./App.css";
import Home from "./pages/LandingPage/Home";
import Welcome from "./pages/Welcome";
import Register from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import { Route } from "react-router-dom";
class App extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     route: "",
  //     isSignedIn: false,
  //     user: {
  //       email: "",
  //       password: ""
  //     }
  //   };
  // }

  // // Func to save user
  // saveUser = data => {
  //   this.setState({
  //     user: {
  //       email: data.email,
  //       password: data.password
  //     }
  //   });
  // };

  // onPageChange = route => {
  //   if (route === "welcome") {
  //     this.setState({ route: "welcome", isSignedIn: true });
  //   } else if (route === "register") {
  //     this.setState({ route: "register" });
  //   } else if (route === "signin") {
  //     this.setState({ route: "signin" });
  //   }
  // };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Welcome} />
      </div>
    );
  }
}

export default App;
