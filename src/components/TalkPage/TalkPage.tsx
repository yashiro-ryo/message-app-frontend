import React from "react";
import TalkPageLeftPane from "./TalkPageLeft/TalkPageLeft";
import TalkPageMainPane from "./TalkPageMain/TalkPageMain";
import "../../style/TalkPage/TalkPage.scss";

function TalkPage() {
  return (
    <div className="talkpage">
      <TalkPageLeftPane
      />
      <TalkPageMainPane />
    </div>
  );
}

export default TalkPage;
