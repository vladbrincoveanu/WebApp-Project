import { ShoppingListViewModel } from "../../view-models/shopping-list";
import AxiosInstance from "axios";
import { baseUrl } from "src/view-models/baseUrl";

const POST_HEADERS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

export class ShoppingListApiService {
  async getShoppingList(): Promise<ShoppingListViewModel[]> {
    const response = await fetch(baseUrl + "/api/shoppingList/All");
    const data = await response.json();
    return data;
  }

  async addShoppingList(shoppingList: ShoppingListViewModel) {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(shoppingList)
    };
    const url = baseUrl + "/api/ShoppingList/AddOrUpdateShoppingList";
    const response = await fetch(url, header);
    return response.status;
  }

  async getShoppingListById(id: number): Promise<ShoppingListViewModel> {
    const response = await fetch(
      baseUrl + "/api/ShoppingList/GetShoppingListById/" + id
    );
    const data = await response.json();
    return data;
  }
}

export default new ShoppingListApiService();
