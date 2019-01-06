import * as React from "react";
import { inject, observer } from "mobx-react";
import { ShoppingListStore } from "../../../store/shopping-list-store";
import { ViewStore } from "../../../store/view-store";
import { ShoppingListTabs } from "../../../view-models/shopping-list-tabs";
import { ShoppingListView } from "./shopping-list-view/ShoppingListView";
import "../../shared/shared-css/list-all.css";
import { ShoppingListViewModel } from "../../../view-models/shopping-list";

interface Props {
  shoppingListStore: ShoppingListStore;
  viewStore: ViewStore;
}

interface State {
  shoppingListToOmit: number[];
  shoppingList: ShoppingListViewModel[];
}

const initialState: State = {
  shoppingListToOmit: [],
  shoppingList: []
};

@inject("shoppingListStore")
@inject("viewStore")
@observer
export class ShoppingList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    this.props.shoppingListStore.loadShoppingList();
    this.props.viewStore.changeActiveShoppingListTab(ShoppingListTabs.all);
  }

  handleShoppingListToOmit(shoppingListToOmit: number[]) {
    this.setState({ shoppingListToOmit: shoppingListToOmit });
  }

  getShoppingListItems(): ShoppingListViewModel[] {
    let result = this.props.shoppingListStore.getShoppingList;
    return result;
  }

  render(): React.ReactNode {
    return (
      <div className="list-all">
        <ShoppingListView
          shoppingListStore={this.props.shoppingListStore}
          shoppingLists={this.getShoppingListItems.bind(this)()}
          shoppingListToOmit={this.state.shoppingListToOmit}
        />
      </div>
    );
  }
}
