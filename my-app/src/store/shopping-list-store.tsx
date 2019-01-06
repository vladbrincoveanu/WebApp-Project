import { observable, action, computed } from "mobx";
import { ShoppingListViewModel } from "../view-models/shopping-list";
import ShoppingListApiInstance, {
  ShoppingListApiService
} from "./api-services/shopping-list-api.service";

export class ShoppingListStore {
  private shoppingListApi: ShoppingListApiService;
  @observable
  shoppingList: ShoppingListViewModel[] = [];
  @observable
  activeShoppingList: ShoppingListViewModel;
  @observable
  status: number;

  constructor(shoppingListApi: ShoppingListApiService) {
    this.shoppingListApi = shoppingListApi;
    this.activeShoppingList = {
      id: 0,
      name: "",
      description: "",
      itemList: [],
      ingredientList: []
    };
  }

  @action
  loadShoppingList(callback?: Function) {
    this.shoppingListApi
      .getShoppingList()
      .then(data => {
        this.shoppingList = data.map(
          shoppingList => new ShoppingListViewModel(shoppingList)
        );
      })
      .then(() => {
        if (callback != undefined) {
          callback();
        }
      });
  }

  @action.bound
  public addShoppingList(shoppingList: any, callback?: Function) {
    this.shoppingListApi
      .addShoppingList(shoppingList)
      .then(status => (this.status = status))
      .then(() => {
        if (callback != undefined) {
          callback();
        }
      });
  }

  @action
  public loadActiveShoppingList(
    id: number,
    loadedShoppingListCallBack: Function
  ) {
    this.shoppingListApi.getShoppingListById(id).then(data => {
      this.activeShoppingList = data;
      loadedShoppingListCallBack(data);
    });
  }

  @computed
  get getShoppingList(): ShoppingListViewModel[] {
    return this.shoppingList;
  }
}
export default new ShoppingListStore(ShoppingListApiInstance);
