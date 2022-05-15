// User
var id: number = 0;
var userName: string = "";
var token: string = "";

export function setId(contents: number) {
  id = contents;
}

export function setName(contents: string) {
  userName = contents;
}

export function setToken(contents: string) {
  token = contents;
}

export function getId(): number {
  return id;
}

export function getName(): string {
  return userName;
}

export function getToken(): string {
  return token;
}