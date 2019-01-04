import UserApiInstance, {
  UserApiService
} from "./api-services/user-api.service";
import { observable, action } from "mobx";
import { UserCommandModel, UserModel } from "src/view-models/users";

export class UserStore {
  private userApi: UserApiService;
  @observable user: UserModel;
  @observable users: UserCommandModel[] = [];
  @observable logged: boolean;
  @observable statusCode: number;

  constructor(userApi: UserApiService) {
    this.userApi = userApi;
  }

  @action.bound
  public addUser(user: UserModel) {
    this.userApi.addUser(user);
  }

  @action
  public getUsers(): UserCommandModel[] {
    return this.users;
  }

  @action
  public logIn(user: UserCommandModel, loadedUserCallback: Function) {
    this.userApi;
    this.userApi.logIn(user).then(data => {
      this.user = data;
      loadedUserCallback(data);
    });
  }

  @action
  public loadUsers(callback?: Function) {
    this.userApi
      .getAllUsers()
      .then(data => {
        this.users = data.map(
          user =>
            new UserCommandModel(
              null,
              user.userName,
              user.email,
              user.passwordHash
            )
        );
      })
      .then(() => {
        if (callback != undefined) {
          callback();
        }
      });
  }

  @action
  public loadUserFromLocalStorage() {
    const userAsString = localStorage.getItem("user");
    if (userAsString != null) {
      this.user = JSON.parse(userAsString);
    }
  }

  @action
  public saveUserToLocalStorage(user: UserModel) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export default new UserStore(UserApiInstance);
