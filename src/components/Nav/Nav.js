import React from "react";

const Nav = props => (
  <nav>
    <h2>{props.title}</h2>
    <ul>
      <li>{props.correctIncorrect}</li>
      <li>Current Score: {props.score}</li>
      <li>High Score: {props.highScore}</li>
    </ul>
  </nav>
);

export default Nav;
