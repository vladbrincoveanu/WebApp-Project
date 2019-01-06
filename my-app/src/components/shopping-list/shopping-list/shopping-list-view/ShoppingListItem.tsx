import * as React from "react";
import { inject, observer } from "mobx-react";
import { ShoppingListViewModel } from "../../../../view-models/shopping-list";
import "../../../shared/shared-css/list-all.css";
import "./shopping-list.css";
import { Icon } from "@blueprintjs/core";
import MyIcon from "../../../shared/recipe-icon/MyIcon";
import * as classNames from "classnames";
import { Redirect } from "react-router-dom";
import { Sl } from "../../../../images/shopping-list.png";

interface Props {
  shoppingList: ShoppingListViewModel;
  id: number;
}

interface State {
  favourite: boolean;
  editShopping: number;
  isOpen: boolean;
  redirect: boolean;
}

const initialState = {
  favourite: false,
  editShopping: 1,
  isOpen: false,
  redirect: false
};

@inject("shoppingListStore")
@observer
export class ShoppingListItem extends React.Component<Props, State> {
  state: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect to={"/shoppingList/edit/" + this.props.shoppingList.id} />
      );
    } else {
      return null;
    }
  };

  private handleViewShoppingList(event: any) {
    window.location.href = "/shoppingList/GetShoppingListById/" + this.props.id;
  }

  private handleOpen = () => this.setState({ isOpen: true });

  render() {
    return (
      <div className="list-item">
        {/* <MyIcon
          className="list-item-photo"
          onClick={this.handleViewShoppingList.bind(this)}
        /> */}
        <img
          src={Sl}
          alt="no img"
          className="list-item-photo"
          onClick={this.handleViewShoppingList.bind(this)}
        />
        <div className="summary_field">{this.props.shoppingList.name}</div>
        <button
          className={classNames({
            "all-button ": true,
            "button-display": true,
            "button-display-favourite": true
          })}
          onClick={this.handleOpen}
        >
          &hearts;
        </button>
        <div>
          {this.renderRedirect()}
          <button
            className="all-button edit-button button-display"
            onClick={this.setRedirect}
          >
            <Icon icon="edit" iconSize={30} className="edit-icon" />
          </button>
        </div>
      </div>
    );
  }
}
