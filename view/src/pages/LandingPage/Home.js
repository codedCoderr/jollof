import React from "react";
import "./Home.css";
import { Redirect } from "react-router-dom";
import whiteBg from "../../assets/curvedWhitebg.svg";

export default class Home extends React.Component {
  state = {
    url: "/"
  };

  onPageChange = page => {
    this.setState({
      url: "/" + page
    });
  };
  render() {
    return this.state.url !== "/" ? (
      <Redirect push to={this.state.url} />
    ) : (
      <div className="Home">
        <div className="btn-con">
          <button
            onClick={() => this.onPageChange("login")}
            className="btn-white"
          >
            Login
          </button>
          <button
            onClick={() => this.onPageChange("register")}
            className="btn-white"
          >
            Register
          </button>
        </div>

        <img
          src={whiteBg}
          alt=""
          width="100%"
          height="100%"
          style={{ marginTop: "2%" }}
        />
      </div>
    );
  }
}