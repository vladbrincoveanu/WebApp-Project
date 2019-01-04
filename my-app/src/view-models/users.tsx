import { observable } from "mobx";

export class UserCommandModel {
  @observable userName?: string;
  @observable email?: string;
  @observable passwordHash?: string;

  constructor(
    user: any,
    userName?: string,
    email?: string,
    passwordHash?: string
  ) {
    if (user != null) {
      this.userName = user.username;
      this.email = user.email;
      this.passwordHash = user.passwordhash;
    } else {
      this.userName = userName;
      this.email = email;
      this.passwordHash = passwordHash;
    }
  }
}

export class UserModel {
  @observable userName?: string;
  @observable email?: string;
  @observable passwordHash?: string;

  constructor(user: any) {
    this.userName = user.username;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }
}
