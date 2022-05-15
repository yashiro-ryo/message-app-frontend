import React from "react";
import { getId } from "../../../datastore/userDataStore";
import "../../../style/TalkPage/TalkPageMainBody.scss";

type Props = {
  msg: Array<{
    talkroomId: number;
    sentUserId: number;
    msgBody: string;
    sentTime: number;
  }>;
};

function TalkExist(props: Props) {
  return (
    <div className="talk-page">
      {props.msg.map((partialMsg, index) => {
        return (
          <div
            className={
              "msg-container d-flex justify-content-" +
              (partialMsg.sentUserId == getId() ? "end" : "start")
            }
            key={index}
          >
            <div
              className={
                "msg-wrapper " +
                (partialMsg.sentUserId == getId() ? "is-me" : "is-you")
              }
            >
              {/*<p className="user-name">{partialMsg.userName}</p>*/}
              <div className="msg-body">
                <p className="msg-text">{partialMsg.msgBody}</p>
              </div>
              <div className="msg-append">
                <p className="msg-time">{partialMsg.sentTime}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TalkIsNotExist() {
  return (
    <div className="error-msg">
      <p>メッセージが存在しません</p>
    </div>
  );
}

function TalkPageMainBody(props: Props) {
  return <div className="talk-page-msg-pane">
    {props.msg.length == 0 ? <TalkIsNotExist />: <TalkExist msg={props.msg}/>}
  </div>;
}

export default TalkPageMainBody;
