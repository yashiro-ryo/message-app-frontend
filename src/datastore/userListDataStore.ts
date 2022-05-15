// UserList
type Users = {
  id: number;
  name: string;
};
var users = new Array<Users>();

export function setUsers(contents: Array<Users>) {
  users = contents;
}

export function getUsers(): Array<Users> {
  return users;
}
