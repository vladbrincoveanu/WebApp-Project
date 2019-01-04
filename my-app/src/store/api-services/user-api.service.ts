import { baseUrl } from "./../../view-models/baseUrl";
import { UserModel, UserCommandModel } from "./../../view-models/users";

const POST_HEADERS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

const GET_HEADERS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};

export class UserApiService {
  addUser(user: UserModel) {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(user)
    };
    console.log(user);
    return fetch(baseUrl + "/api/user/AddOrUpdate", header).then(
      response => response.status
    );
  }

  logIn(user: UserCommandModel): Promise<UserCommandModel> {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(user)
    };
    return fetch(baseUrl + "/api/user/LogIn", header)
      .then(response => response.json())
      .then(data => data);
  }

  getAllUsers(): Promise<UserCommandModel[]> {
    let header: RequestInit = {
      ...GET_HEADERS
    };
    return fetch(baseUrl + "/api/user/All", header)
      .then(response => response.json())
      .then(data => data);
  }

  update(user: UserModel) {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(user)
    };
    return fetch(baseUrl + "/api/User/AddOrUpdate", header).then(
      response => response.status
    );
  }
}
export default new UserApiService();
