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
  async addUser(user: UserModel) {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(user)
    };
    const response = await fetch(baseUrl + "/api/user/AddOrUpdate", header);
    return response.status;
  }

  async logIn(user: UserCommandModel): Promise<UserCommandModel> {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(user)
    };
    const response = await fetch(baseUrl + "/api/user/LogIn", header);
    const data = await response.json();
    return data;
  }

  async generateReport() {
    let header: RequestInit = {
      ...GET_HEADERS
    };
    const response = await fetch(
      baseUrl + "/api/reports/GenerateReportPdf",
      header
    );
    return "data";
  }

  async getAllUsers(): Promise<UserCommandModel[]> {
    let header: RequestInit = {
      ...GET_HEADERS
    };
    const response = await fetch(baseUrl + "/api/user/All", header);
    const data = await response.json();
    return data;
  }

  async update(user: UserModel) {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(user)
    };
    const response = await fetch(baseUrl + "/api/User/AddOrUpdate", header);
    return response.status;
  }
}
export default new UserApiService();
