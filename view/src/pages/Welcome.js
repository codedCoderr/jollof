import React from "react";

export default function Welcome({ onPageChange, userDetails: { email } }) {
  return (
    <div>
      <img alt="Your ugly face" />
      <h3>Welcome {email}</h3>
      <p onClick={() => onPageChange('signout')}>Signout</p>
    </div>
  );
}
