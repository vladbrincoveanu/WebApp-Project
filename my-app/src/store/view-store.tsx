import { observable, action, computed } from "mobx";
import { HeaderTabs } from "../view-models/header-tabs";
import { RecipesTabs } from "../view-models/recipes-tabs";
import { ShoppingListTabs } from "../view-models/shopping-list-tabs";

export class ViewStore {
  @observable headerActivatedTab: HeaderTabs = HeaderTabs.home;
  @observable recipesActivatedTab: RecipesTabs;
  @observable shoppingListActivatedTab: ShoppingListTabs;

  @computed get activeHeaderTab() {
    return this.headerActivatedTab;
  }

  @computed get activeRecipesTab() {
    return this.recipesActivatedTab;
  }

  @computed get activeShoppingListTab() {
    return this.shoppingListActivatedTab;
  }

  @action.bound
  changeActiveHeaderTab(tab: HeaderTabs) {
    this.headerActivatedTab = tab;
  }

  @action.bound
  changeActiveRecipesTab(tab: RecipesTabs) {
    this.recipesActivatedTab = tab;
  }

  @action.bound
  changeActiveShoppingListTab(tab: ShoppingListTabs) {
    this.shoppingListActivatedTab = tab;
  }
}

export default new ViewStore();
