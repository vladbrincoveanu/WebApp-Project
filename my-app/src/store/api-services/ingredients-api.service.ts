import { IngredientModel } from "../../view-models/ingredients";
import AxiosInstance from "axios";
import { baseUrl } from "src/view-models/baseUrl";
import { QuantityType } from "src/view-models/quantity-type";

const DELETE_HEADERS = {
  method: "DELETE",
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

export class IngredientApiService {
  async getIngredients(): Promise<IngredientModel[]> {
    let header: RequestInit = {
      ...GET_HEADERS
    };
    const response = await fetch(baseUrl + "/api/ingredient/All", header);
    const data = await response.json();
    return data;
  }

  async getIngredientById(id: number): Promise<IngredientModel> {
    const response = await fetch(
      baseUrl + "/api/ingredient/GetIngredient/" + id
    );
    const data = await response.json();
    return data;
  }

  AddOrUpdateRecipe(ingredient: IngredientModel): any {
    const url = baseUrl + "/api/ingredient/AddOrUpdateIngredient";
    return AxiosInstance.post(url, JSON.stringify(ingredient)).then(
      r => r.status
    );
  }

  async getQuantityTypes(): Promise<QuantityType[]> {
    const response = await fetch(baseUrl + "/api/ingredient/GetQuantityTypes");
    return response.json();
  }

  async deleteRecipe(ingredientId: number): Promise<number> {
    const url = baseUrl + "/api/ingredient/Delete";
    let header: RequestInit = {
      ...DELETE_HEADERS,
      body: JSON.stringify(ingredientId)
    };
    const response = await fetch(url, header);
    return response.status;
  }
}

export default new IngredientApiService();
