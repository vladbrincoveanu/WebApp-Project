import { QuantityType } from "./quantity-type";
import { observable } from "mobx";

export class IngredientModel {
  @observable name: string;
  @observable quantity: number;
  @observable discount: number;
  @observable quantityType: QuantityType;

  constructor(ingredient: any) {
    this.name = ingredient.name;
    this.quantity = ingredient.quantity;
    this.discount = ingredient.discount;
    this.quantityType = ingredient.quantityType;
  }
}
