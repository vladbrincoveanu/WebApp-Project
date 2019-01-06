import { observable, action } from "mobx";
import { QuantityType } from "./quantity-type";

export class ItemListViewModel {
  @observable
  public content: string;
  @observable
  public quantity: number;
  @observable
  public quantityType: QuantityType;

  constructor(content: string, quantity: number, quantityType: QuantityType) {
    this.content = content;
    this.quantity = quantity;
    this.quantityType = quantityType;
  }
}
