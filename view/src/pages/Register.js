import React, { Component } from "react";
import "./Register.css";


class Register extends Component {
  render() {
    return (
      <div>
        <div className="form-con">
          <form onSubmit={this.onSubmit} method="post">
            <h1 className="text-primary" style={{ textAlign: "center" }}>
              Get Started
            </h1>
            <div style={{ textAlign: "center" }}>
              <img src={Image} alt="" height="200px" width="200px" />
            </div>
            <label htmlFor="username" className="label-brk">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={this.onEmailChange}
              id="email"
              required
            />
            <label htmlFor="password" className="label-brk">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={this.onPasswordChange}
              id="password"
              required
            />
            <button className="btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
