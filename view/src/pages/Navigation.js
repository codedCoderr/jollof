import React from "react";

function Navigation({ isSignedIn, onPageChange }) {
  if (isSignedIn === true) {
    return (
      <nav>
        <p onClick={() => onPageChange("signout")}>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ alignContent: "center" }}>
        <button onClick={() => onPageChange("signin")}>Sign In</button>
        <button onClick={() => onPageChange("register")}>Register</button>
      </nav>
    );
  }
}

export default Navigation;
