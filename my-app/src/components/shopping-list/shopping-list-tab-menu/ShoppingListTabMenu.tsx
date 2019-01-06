import * as React from "react";
import * as classNames from "classnames";
import { Link, Redirect } from "react-router-dom";
import "./shopping-list-tab-menu.css";
import { observer, inject } from "mobx-react";
import { ViewStore } from "../../../store/view-store";
import { HeaderTabs } from "../../../view-models/header-tabs";
import { ShoppingListTabs } from "../../../view-models/shopping-list-tabs";

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export class ShoppingListTabMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.props.viewStore.changeActiveHeaderTab(HeaderTabs.shoppingList);
  }

  isActive(tab: ShoppingListTabs) {
    return this.props.viewStore.activeShoppingListTab === tab;
  }

  public render() {
    return (
      <div>
        <div className="header-tabs">
          <ul className="shopping-list-tab-menu tabs">
            <li
              className={classNames({
                active: this.isActive(ShoppingListTabs.add),
                "shopping-list-tab-menu": true
              })}
            >
              <Link to="/shoppingList/add">Add</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(ShoppingListTabs.all),
                "shopping-list-tab-menu": true
              })}
            >
              <Link to="/shoppingList/all">All</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ShoppingListTabMenu;
