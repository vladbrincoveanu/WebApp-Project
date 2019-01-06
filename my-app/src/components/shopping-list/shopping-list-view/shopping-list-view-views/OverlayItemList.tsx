import * as React from "react";
import "./../shopping-list-view.css";
import { Overlay, Icon } from "@blueprintjs/core";
import { ItemList } from "../shopping-list-view-elements/ItemList";
import { ItemListViewModel } from "../../../../view-models/itemList";

interface Props {
  handleCloseItemList: Function;
  isOpenItem: boolean;
  checked: boolean[];
  itemList: ItemListViewModel[];
}

class OverlayItemList extends React.Component<Props> {
  render() {
    return (
      <Overlay
        isOpen={this.props.isOpenItem}
        hasBackdrop={false}
        autoFocus={true}
        usePortal={false}
      >
        <div className="overlay-content-shopping-list">
          <div className="minimize-button">
            <Icon
              color="#f25800"
              icon="minimize"
              iconSize={20}
              onClick={this.props.handleCloseItemList.bind(this)}
            />
          </div>
          <br />
          <ItemList
            itemList={this.props.itemList}
            styleClass="big-products"
            checked={this.props.checked}
          />
        </div>
      </Overlay>
    );
  }
}

export default OverlayItemList;
