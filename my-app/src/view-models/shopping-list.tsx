import { observable, action, computed } from "mobx";
import { ItemListViewModel } from "./itemList";
import { IngredientModel } from "./ingredients";

export class ShoppingListViewModel {
  @observable
  public id: number;
  @observable
  public name: string;
  @observable
  public itemList: ItemListViewModel[];
  @observable
  public ingredientList: IngredientModel[];
  @observable
  public description: string;
  constructor(shoppingList: any) {
    this.id = shoppingList.id;
    this.name = shoppingList.name;
    this.description = shoppingList.description;
    this.itemList = shoppingList.itemList;
    this.ingredientList = shoppingList.ingredientList;
  }
}
