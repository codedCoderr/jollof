import React from "react";
import { Redirect } from "react-router";
import welcome_background from "../assets/welcome_background.jpg";
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.location.state != null) {
      this.state = this.props.location.state;
      console.log(this.state);
    } else {
      this.state = {
        user: null
      };
    }
  }

  toPage = page => {
    console.log(page);
    window.location.href =
      window.location.protocol + "//" + window.location.host + page;
  };

  welcomeBackgroundStyle = {
    background: `url(${welcome_background})`,
    height: "100%",
    width: "100%",
    backgroundSize: "cover"
  };

  welcomeTextStyle = {
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%,-50%)",
    color: "white",
    textAlign: "center",
    fontFamily: "Raleway"
  };

  btnSignOutStyle = {
    color: "black",
    textAlign: "centter",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 auto",
    background: "#04B254",
    borderRadius: "30px"
  };
  render() {
    return this.state.user === null ? (
      <Redirect to="/" />
    ) : (
      <div style={this.welcomeBackgroundStyle}>
        <div className="welcome_text" style={this.welcomeTextStyle}>
          <p>
            Welcome <br /> {this.state.user.email}
          </p>
          <button onClick={() => this.toPage("")} style={this.btnSignOutStyle}>
            Sign out
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
