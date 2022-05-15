import { Socket } from "socket.io-client";
import Log from "../Tools/Log";
import { emitter } from "./event-emitter";
import { setTalk } from "../datastore/talkPaneMainDataStore";
import { setTalkrooms } from "../datastore/talkPaneLeftDataStore";
import { setUsers } from "../datastore/userListDataStore";

export default function socketEventListener(socket: Socket) {
  socket.onAny((eventName) => {
    Log.v("socket :" + "\u001b[32m" + eventName);
  });
  /* サーバーからクライアントへのsocket */
  // トーク受信
  socket.on("update-client-talk", (talk) => {
    setTalk(talk);
    emitter.emit("update-talk", talk);
  });

  // メッセージ送信結果受信
  socket.on("send-client-submit-status-code", (code) => {
    emitter.emit("receive-submit-status-code", code);
  });

  // トークルーム更新
  socket.on("update-client-talkroom", (talkroom) => {
    setTalkrooms(talkroom);
    emitter.emit("update-talkroom", talkroom);
  });

  // 連絡先更新
  socket.on("update-client-users", (users) => {
    setUsers(users);
    emitter.emit("update-users", users);
  });

  /* クライアントからサーバーへのイベント */
  // トーク取得
  emitter.on("get-talk", (talkroomId: number) => {
    socket.emit("update-talk", talkroomId);
  });

  // メッセージ送信
  emitter.on(
    "submit-message",
    (msg: {
      talkroomId: number;
      sentUser: number;
      msgBody: string;
      sentTime: string;
    }) => {
      Log.v("userId :" + msg.sentUser);
      socket.emit(
        "submit-message",
        msg.talkroomId,
        msg.sentUser,
        msg.msgBody,
        msg.sentTime
      );
    }
  );

  // トークルーム取得
  emitter.on("get-talkrooms", (userId: number) => {
    socket.emit("update-talkrooms", userId);
  });

  // 連絡先取得
  emitter.on("get-users", (userId: number) => {
    socket.emit("update-users", userId);
  });
}
