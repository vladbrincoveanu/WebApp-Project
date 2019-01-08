import { RecipeViewModel } from "../../view-models/recipe";
import AxiosInstance from "axios";
import { QuantityType } from "../../view-models/quantity-type";
import { baseUrl } from "src/view-models/baseUrl";

const DELETE_HEADERS = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
};

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

export class RecipesApiService {
  async getRecipes(): Promise<RecipeViewModel[]> {
    let header: RequestInit = {
      ...GET_HEADERS
    };
    const response = await fetch(baseUrl + "/api/recipes/All", header);
    const data = await response.json();
    return data;
  }

  async getRecipeById(id: number): Promise<RecipeViewModel> {
    let header: RequestInit = {
      ...GET_HEADERS
    };
    const response = await fetch(
      baseUrl + "/api/recipes/GetRecipeById/" + id,
      header
    );
    const data = await response.json();
    return data;
  }

  async getQuantityTypes(): Promise<QuantityType[]> {
    const response = await fetch(baseUrl + "/api/ingredient/GetQuantityTypes");
    return response.json();
  }

  async AddOrUpdateRecipe(recipe: RecipeViewModel): Promise<number> {
    let header: RequestInit = {
      ...POST_HEADERS,
      body: JSON.stringify(recipe)
    };
    const url = baseUrl + "/api/recipes/AddOrUpdateRecipe";
    // return AxiosInstance.post(url, JSON.stringify(recipe)).then(r => r.status);
    const response = await fetch(url, header);
    return response.status;
  }

  async deleteRecipe(recipeId: number): Promise<number> {
    const url = baseUrl + "/api/recipes/Delete/" + recipeId;
    let header: RequestInit = {
      ...GET_HEADERS
    };
    const response = await fetch(url, header);
    return response.status;
  }
}

export default new RecipesApiService();
