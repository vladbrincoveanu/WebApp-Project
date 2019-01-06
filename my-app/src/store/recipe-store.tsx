import { observable, computed, action } from "mobx";
import { RecipeViewModel } from "../view-models/recipe";
import RecipesApiInstance, {
  RecipesApiService
} from "./api-services/recipes-api.service";

export class RecipesStore {
  private recipeApi: RecipesApiService;
  @observable
  recipes: RecipeViewModel[] = [];
  @observable
  activeRecipe: RecipeViewModel;
  @observable
  statusCode: number;

  constructor(recipesApi: RecipesApiService) {
    this.recipeApi = recipesApi;
    this.activeRecipe = {
      id: 0,
      rating: 0,
      steps: [],
      name: "",
      summary: "",
      ingredients: []
    };
  }

  @action
  loadRecipes(callback?: Function) {
    this.recipeApi
      .getRecipes()
      .then(
        data => (this.recipes = data.map(recipe => new RecipeViewModel(recipe)))
      )
      .then(() => {
        if (callback != undefined) {
          callback();
        }
      });
  }

  get getRecipies(): RecipeViewModel[] {
    return this.recipes;
  }

  @action.bound
  public AddOrUpdateRecipe(recipe: RecipeViewModel, callback?: Function) {
    this.recipeApi
      .AddOrUpdateRecipe(recipe)
      .then(statusCode => (this.statusCode = statusCode))
      .then(() => {
        if (callback != undefined) {
          callback();
        }
      });
  }

  @action
  loadActiveRecipe(id: number, loadedRecipeCallback: Function) {
    this.recipeApi.getRecipeById(id).then(data => {
      this.activeRecipe = data;
      loadedRecipeCallback(data);
    });
  }

  @action.bound
  deleteRecipe(recipeId: number, callback?: Function) {
    this.recipeApi
      .deleteRecipe(recipeId)
      .then(statusCode => (this.statusCode = statusCode))
      .then(() => {
        if (callback != undefined) {
          callback();
        }
      });
  }
}

export default new RecipesStore(RecipesApiInstance);
