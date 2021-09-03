interface UserInfo {
  id: string;
  username: string;
}

export interface UserMap {
  [id: string]: UserInfo;
}
