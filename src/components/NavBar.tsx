import React, { useState } from "react";
import { getName } from "../datastore/userDataStore";
import "../style/navbar.scss";

type Props = {
  isLoading: boolean;
  handleTalkPage: () => void;
  handleUserPage: () => void;
};

function NavBarLoading() {
  return (
    <nav className="navbar navbar-dark" style={{ background: "#46ccd7" }}>
      <a className="navbar-brand">Messanger</a>
    </nav>
  );
}

function NavBarDefault(props: Props) {
  const [userName, setUserName] = useState(getName())
  return (
    <nav className="navbar navbar-dark" style={{ background: "#46ccd7" }}>
      <a className="navbar-brand" href="#">
        <p>{userName}</p>
      </a>
      <div className="btn-group d-flex flex-row">
        <button onClick={props.handleTalkPage}>トーク</button>
        <button onClick={props.handleUserPage}>連絡先</button>
      </div>
    </nav>
  );
}

export default function NavBar(props: Props) {
  return (
    <div className="navbar-container">
      {props.isLoading ? NavBarLoading() : NavBarDefault(props)}
    </div>
  );
}
