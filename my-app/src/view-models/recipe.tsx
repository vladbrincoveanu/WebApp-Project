import { computed, observable } from "mobx";
import { StepViewModel } from "./step";
import { IngredientModel } from "./ingredients";

export class RecipeViewModel {
  @observable
  public id: number;
  @observable
  public steps: StepViewModel[];
  @observable
  public ingredients: IngredientModel[];
  @observable
  public rating: number;
  @observable
  public name: string;
  @observable
  public summary: string;
  constructor(recipe: any) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.steps = recipe.steps;
    this.summary = recipe.summary;
    this.rating = recipe.rating;
  }
}
