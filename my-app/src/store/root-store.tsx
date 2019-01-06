import UserStoreInstance, { UserStore } from "./user-store";
import ViewStoreInstance, { ViewStore } from "./view-store";
import RecipesStoreInstance, { RecipesStore } from "./recipe-store";
import IngredientStoreInstance, { IngredientStore } from "./ingredient-store";
import ShoppingListStoreInstance, {
  ShoppingListStore
} from "./shopping-list-store";

export class RootStore {
  userStore: UserStore;
  viewStore: ViewStore;
  recipesStore: RecipesStore;
  ingredientStore: IngredientStore;
  shoppingListStore: ShoppingListStore;
  constructor() {
    this.userStore = UserStoreInstance;
    this.viewStore = ViewStoreInstance;
    this.recipesStore = RecipesStoreInstance;
    this.ingredientStore = IngredientStoreInstance;
    this.shoppingListStore = ShoppingListStoreInstance;
  }
}
export default new RootStore();
