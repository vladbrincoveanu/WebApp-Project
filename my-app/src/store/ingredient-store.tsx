import { observable } from "mobx";

export class IngredientStore {
  private recipeApi: any;
  @observable ingredients: any[] = [];
}
