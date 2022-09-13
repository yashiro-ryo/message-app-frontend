import axios from "../config/axiosConfig";
import { io } from "socket.io-client";
import { getId, setId, setName, setToken } from '../datastore/userDataStore';
import Log from '../Tools/Log'
import socketEventListener from "./socketEventListener";

export class Auth {
  // login and create connection
  login() {
    const token = localStorage.getItem("message-token");
    console.log(token)
    const id = localStorage.getItem("message-id");
    console.log('id :' + id)
    const name = localStorage.getItem("message-name");
    console.log('name :' + name)
    if (token !== null && id !== null && name !== null) {
      console.log('sign in with localstrage id password')
      this.createConnection(token, Number(id));
      setToken(token);
      setId(Number(id));
      setName(name);
      Log.v('sucessed login')
    } else {
      console.log('sign in with login id password')
      // 本番環境ではget login pageを実行
      axios
        .post("/login", {
          email: "yashiro@yashiro.com",
          password: "aiueo",
        })
        .then((response) => {
          console.log('successful get user info by axios')
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          localStorage.setItem("userId", response.data.id);
          setId(response.data.id);
          localStorage.setItem("userName", response.data.name);
          setName(response.data.name);
          this.createConnection(response.data.token, response.data.id);
          Log.v('sucessed login')
        })
        .catch((e) => {
          Log.e("failed login :" + e);
        });
    }
  }

  /**
   * サーバーと接続をする関数
   *
   * @param token :string, id: number
   * @returns socket :Socket
   */
  createConnection(token: string, id: number) {
    // Setup socket-io main connection
    console.log("connecting to socket-io");
    const socket = io("http://localhost:3030", {
      query: {
        token: token,
        id: id
      },
    });
    socket.on("connect", () => {
      // 接続成功
      Log.v("sucessed conect server");
    });
    socketEventListener(socket);

    // 初期ロードに必要な連絡先とトークルームを取得
    socket.emit('update-users', getId());
    socket.emit('update-talkrooms', getId());
  }
}
