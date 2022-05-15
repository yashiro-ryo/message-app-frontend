import React, { useState } from "react";
import CreateTalkroomModal from "./CreateTalkroomModal";
import { emitter } from "../../../service/event-emitter";
import Log from "../../../Tools/Log";
import "../../../style/TalkPage/TalkPageLeftPane.scss";
import {
  setChoicedTalkroomid,
  getChoicedTalkroomId,
  setTalkrooms,
  getTalkroom,
} from "../../../datastore/talkPaneLeftDataStore";

function TalkPageLeftPane() {
  // state
  const [talkroom, setTalkroom] = useState(getTalkroom);

  // get talkroom
  emitter.once("update-talkroom", (talkrooms) => {
    // insert data to datastore
    setTalkrooms(talkrooms);
    // update dom
    setTalkroom(talkrooms);
    Log.v("update-talkrooms");
  });

  // methods
  const showCreateTalkroomModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    Log.v("show create talk room modal");
    emitter.emit("talk-page-left.show-create-talk-modal");
  };

  const showTalkPage = (event: React.MouseEvent<HTMLElement>) => {
    const choicedTalkroomId =
      event.currentTarget.getAttribute("data-talkroomId");
    setChoicedTalkroomid(Number(choicedTalkroomId));
    Log.v("talkroomId stored :" + getChoicedTalkroomId());
    emitter.emit("get-talk", choicedTalkroomId);
  };

  return (
    <div className="talk-page-left-pane">
      <div className="talk-left-pane-header">
        <p>トーク一覧</p>
        <button onClick={showCreateTalkroomModal}>トークを作成</button>
      </div>
      <div className="talk-left-pane-body">
        {talkroom.map((value1, index) => (
          <button
            className="talkroom-name talk-room"
            onClick={showTalkPage}
            data-talkroomId={value1.talkroomId}
            key={index}
          >
            <p>{value1.talkroomName}</p>
            <p>{value1.talkroomId}</p>
          </button>
        ))}
      </div>
      <CreateTalkroomModal />
    </div>
  );
}

export default TalkPageLeftPane;
