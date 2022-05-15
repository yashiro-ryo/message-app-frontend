import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import TalkPage from "./TalkPage/TalkPage";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import UserList from "./UserList";

import "../style/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { emitter } from "../service/event-emitter";
import { getId } from "../datastore/userDataStore";

export default function App() {
  // ローディングが終わるまではトークと連絡先は表示しない
  const [isTalkPageVisible, showTalkPage] = useState(true);
  const [isUserPageVisible, showUserPage] = useState(false);
  const [isLoadingPageVisible, showLoadingPage] = useState(false)

  const handleTalkPage = () => {
    showTalkPage(true);
    showUserPage(false);
  };

  const handleUserPage = () => {
    showTalkPage(false);
    showUserPage(true);
  };

  emitter.on('hide-loading-page', () => {
    showTalkPage(true);
    showUserPage(false);
    showLoadingPage(false);
  })

  useEffect(() => {
    emitter.emit('get-users', getId());
    emitter.emit('get-talkrooms', getId());
  })

  return (
    <div className="app">
      <NavBar
        key={"navbar"}
        isLoading={isLoadingPageVisible}
        handleTalkPage={handleTalkPage}
        handleUserPage={handleUserPage}
      />
      <div className="wrap">
        {isLoadingPageVisible ? <LoadingPage /> : ""}
        <ErrorPage isVisible={false} />
        {isTalkPageVisible ? (
          <TalkPage />
        ) : (
          ""
        )}
        {isUserPageVisible ? <UserList /> : ""}
      </div>
    </div>
  );
}
