import React from "react";
// import { Redirect } from "react-router";
import welcome_background from "../assets/welcome_background.jpg";
class NoMatchPage extends React.Component {
    constructor(){
        super();
        this.state = {
            pushTo : "/"
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
    return (
      <div style={this.welcomeBackgroundStyle}>
        <div className="welcome_text" style={this.welcomeTextStyle}>
          <p>
              404 ERROR <br/>
            Welcome Stranger
          </p>
          <button onClick={() => this.toPage("")} style={this.btnSignOutStyle}>
            Visit Home
          </button>
        </div>
      </div>
    );
  }
}

export default NoMatchPage;
