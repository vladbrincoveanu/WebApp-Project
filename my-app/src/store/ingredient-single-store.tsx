import { action, observable } from "mobx";
import { IngredientModel } from "../view-models/ingredients";
import { QuantityType } from "../view-models/quantity-type";
import IngredientApiInstance, {
  IngredientApiService
} from "./api-services/ingredients-api.service";

export class IngredientStore {
  private ingredientApi: IngredientApiService;
  @observable ingredients: IngredientModel[] = [];
  @observable quantityTypes: QuantityType[] = [];

  constructor(ingredientApi: IngredientApiService) {
    this.ingredientApi = ingredientApi;
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients = [...this.ingredients, ingredient];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  updateIngredient(ingredient: IngredientModel, index: number) {
    this.ingredients[index] = ingredient;
  }
  updateIngredients(ingredients: IngredientModel[]) {
    this.ingredients = ingredients;
  }
  resetIngredients() {
    this.ingredients = [];
  }

  @action
  loadQuantityTypes() {
    this.ingredientApi.getQuantityTypes().then(data => {
      this.quantityTypes = data;
    });
  }
}

export default new IngredientStore(IngredientApiInstance);
