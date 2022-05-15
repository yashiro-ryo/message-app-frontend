import { Auth } from "./authService";

export default function routine() {
  // ログイン
  const auth = new Auth();
  auth.login();
}
