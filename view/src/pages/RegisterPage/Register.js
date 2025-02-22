import React, { Component } from "react";
import "./Register.css"
import Image from "../../assets/52233.png";
import { Redirect } from "react-router";
class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      isLoading:'',
      registered: false,
      user: null,
      pushTo: ""
    };
  }
  onPageChange = (page, user) => {
    console.log(user);
    this.setState({
      registered: true,
      user: user.user,
      pushTo: page
    });
  };

  toPage = page => {
    // console.log(page);
    // window.location.href =
    //   window.location.protocol + "//" + window.location.host + page;
    this.setState({
      pushTo: page
    })
  };

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  // Submit
  onSubmit = event => {
    this.setState({isLoading:true})
    event.preventDefault();
    // const { saveUser, onPageChange } = this.props;
    const { email, password } = this.state;
    fetch(
      "https://cors-anywhere.herokuapp.com/https://teamjollof.herokuapp.com/api/auth/register",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    )
      .then(res => res.json())
      .then(user => {
        if (user.authenticated === true) {
          this.setState({isLoading:false})
          // saveUser(user);
          this.onPageChange("/dashboard", user);
        } else if (user.error) {
          this.setState({isLoading:false})
          this.setState({ error: user.error });
        }
      });
  };

  render() {
		const { error } = this.state;
		const formstyles ={
				position : "absolute",
				left: "40%"
		}
		const constyles = {

		}
    return (this.state.registered || this.state.pushTo !== "")|| (!this.state.registered && this.state.pushTo !== "")? (
      <Redirect
        push
        to={{
          pathname: this.state.pushTo,
          state: { user: this.state.user }
        }}
      />
    ) :(
      
        <div className="signup-form-con">
          <form onSubmit={this.onSubmit} method="post" style={formstyles} className="form">
            <p>{error}</p>
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
            <button className="btn-primary" disabled={this.state.isLoading}>
              {
                this.state.isLoading ? 'Submitting...' : 'Sign Up'
              }
            </button>
            <button
            onClick={event => {
              event.preventDefault();
              this.toPage("/login");
            }}
            className="btn-transparent-primary"
          >
            Already registered? Login
          </button>
          </form>
        </div>
      
    );
  }
}
export default Register;
