import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TalkPageMainHeader from "./TalkPageMainHeader";
import TalkPageMainBody from "./TalkPageMainBody";
import "../../../style/TalkPage/TalkPageMain.scss";
import { emitter } from "../../../service/event-emitter";
import { getChoicedTalkroomId, getTalkroom } from "../../../datastore/talkPaneLeftDataStore";
import { getId } from '../../../datastore/userDataStore';
import Log from '../../../Tools/Log'

var talkName = "矢代　涼";

type FormData = {
  msg: string;
};

function TalkPageMain() {
  const { register, handleSubmit } = useForm<FormData>();
  // TODO 初期値はできればnullに変更
  const [talk, setTalk] = useState([
    {
      talkroomId: 0,
      sentUserId: 0,
      msgBody: "",
      sentTime: 0,
    },
  ]);

  // event handler
  emitter.on('update-talk', (talk) => {
    setTalk(talk);
  })

  emitter.emit('receive-submit-status-code', (code: number) => {
    if(code == 200){
      Log.v('送信成功');
    }else {
      Log.v('送信失敗');
    }
  })

  // methods
  const onSubmit = (data: any) => {
    console.log("send data :" + data.msg);
    console.log("talkroomId :" + getChoicedTalkroomId());
    console.log("userId :" + 0);
    const msg = {
      talkroomId: getChoicedTalkroomId(),
      sentUser: getId(),
      msgBody: data.msg,
      sentTime: 220513,
    };
    emitter.emit('submit-message', msg)
  };

  const EmptyView = () => {
    return (
      <div className="empty-view">
        <p>トークを選択してください</p>
      </div>
    );
  };

  const TalkPageVisible = () => {
    return (
      <div className="talk-page-visible">
        <div className="message-header">
          <TalkPageMainHeader
            talkName={talkName}
            key={"talk-page-main-header"}
          />
        </div>
        <div className="message-body">
          <TalkPageMainBody msg={talk} key={"talk-page-main-body"} />
        </div>
        <div className="message-footer">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="input-field"
              placeholder="Enterで送信"
              {...register("msg")}
            ></input>
            <input
              type="submit"
              value="送信"
              className="btn btn-primary submit-btn"
            />
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="talk-page-main-pane">
      {getChoicedTalkroomId() == 0 ? <EmptyView /> : <TalkPageVisible />}
    </div>
  );
}

export default TalkPageMain;
