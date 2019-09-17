import React from "react";

export default function Welcome({ userDetails: { username, avatar, status } }) {
  return (
    <div>
      <img src={avatar} />
      <h3>Welcome {username}</h3>
      <p>We know you're a {status}</p>
    </div>
  );
}
