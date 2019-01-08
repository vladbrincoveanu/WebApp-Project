import * as React from "react";
import { inject, observer } from "mobx-react";
import { ShoppingListViewModel } from "../../../../view-models/shopping-list";
import { ShoppingListItem } from "./ShoppingListItem";
import "../../../shared/shared-css/list-all.css";
import { ShoppingListStore } from "../../../../store/shopping-list-store";

interface Props {
  shoppingLists: ShoppingListViewModel[];

  shoppingListToOmit: number[];
  shoppingListStore: ShoppingListStore;
}

interface State {}

const initialState = {};

@inject("shoppingListStore")
@observer
export class ShoppingListView extends React.Component<Props, State> {
  state: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      imageUrl: "../src/images/shoppingimg.png",
      imageLoadError: true
    };
  }

  private shoppingListShouldBeOmittedAtRender(shoppingList) {
    return this.props.shoppingListToOmit.find(id => shoppingList.id == id);
  }

  render() {
    return (
      <React.Fragment>
        <div className="list-items">
          {this.props.shoppingLists.map(shoppingList => {
            return (
              <ShoppingListItem
                shoppingList={shoppingList}
                key={shoppingList.id}
                id={shoppingList.id}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
