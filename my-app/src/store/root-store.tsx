import UserStoreInstance, { UserStore } from "./user-store";
import ViewStoreInstance, { ViewStore } from "./view-store";

export class RootStore {
  userStore: UserStore;
  viewStore: ViewStore;
  constructor() {
    this.userStore = UserStoreInstance;
    this.viewStore = ViewStoreInstance;
  }
}
export default new RootStore();
