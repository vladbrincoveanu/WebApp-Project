import * as React from "react";
import "./shopping-list-view.css";
import { inject, observer } from "mobx-react";
import "../../../App.css";
import { ShoppingListStore } from "../../../store/shopping-list-store";
import { ShoppingListViewModel } from "../../../view-models/shopping-list";
import { ViewStore } from "../../../store/view-store";
import OverlayItemList from "./shopping-list-view-views/OverlayItemList";
import ItemListView from "./shopping-list-view-views/ItemListView";
import Sl from "../../../images/shopping-list.png";

interface Match {
  params: {
    id: number;
  };
}

interface Props {
  shoppingListStore: ShoppingListStore;
  viewStore: ViewStore;
  match: Match;
}

interface State {
  isOpenItem: boolean;
  checked: boolean[];
  isOpenImage: boolean;
  activeShoppingList: ShoppingListViewModel;
  favorites: boolean;
}

const initialState: State = {
  isOpenItem: false,
  checked: [],
  isOpenImage: false,
  activeShoppingList: {
    id: 0,
    name: "",
    description: "",
    itemList: [],
    ingredientList: []
  },
  favorites: false
};
@inject("shoppingListStore")
@inject("viewStore")
@observer
export class ShoppingListView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let shoppingListId = props.match.params.id;
    this.state = initialState;
    if (shoppingListId) {
      this.props.shoppingListStore.loadActiveShoppingList(
        shoppingListId,
        this.loadShoppingList.bind(this)
      );
    }
  }

  private loadShoppingList(shoppingList: ShoppingListViewModel): void {
    this.setState({ activeShoppingList: shoppingList });
  }

  private handleOpenItemList = () => this.setState({ isOpenItem: true });

  private handleCloseItemList = () => this.setState({ isOpenItem: false });

  render() {
    return (
      <div className="view-container">
        <div className="rowShoppingList">
          <div className="column-ShoppingList heading-column-shopping-list">
            <h1 className="topText heading-shopping-list">
              {this.state.activeShoppingList.name}
            </h1>
            <OverlayItemList
              isOpenItem={this.state.isOpenItem}
              handleCloseItemList={this.handleCloseItemList.bind(this)}
              checked={this.state.checked}
              itemList={this.state.activeShoppingList.itemList}
            />
          </div>
        </div>

        <div className="rowShoppingList">
          <div>
            <div className="small-image-ShoppingList">
              <img src={Sl} alt="shopping image" />
            </div>
          </div>
          <ItemListView
            handleOpenItemList={this.handleOpenItemList.bind(this)}
            checked={this.state.checked}
            itemList={this.state.activeShoppingList.itemList}
          />
        </div>
      </div>
    );
  }
}
