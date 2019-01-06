import * as React from "react";
import { Icon } from "@blueprintjs/core";
import { ItemListViewModel } from "../../../../view-models/itemList";
import { ItemList } from "../shopping-list-view-elements/ItemList";

export interface Props {
  handleOpenItemList: Function;
  checked: boolean[];
  itemList: ItemListViewModel[];
}

class ItemListView extends React.Component<Props> {
  render() {
    return (
      <div className="column-products-shopping-list border-section">
        <div className="expand-button">
          <Icon
            color="#f25800"
            icon="maximize"
            iconSize={20}
            onClick={this.props.handleOpenItemList.bind(this)}
          />
        </div>
        <div className="bookmark-icon-ShoppingListProducts">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <ItemList
          itemList={this.props.itemList}
          styleClass="small-products"
          checked={this.props.checked}
        />
      </div>
    );
  }
}

export default ItemListView;
