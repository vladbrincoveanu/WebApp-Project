import * as React from "react";
import "../shopping-list-view.css";
import { Checkbox } from "@blueprintjs/core";
import { ItemListViewModel } from "../../../../view-models/itemList";

interface Props {
  itemList: ItemListViewModel[];
  styleClass: string;
  checked: boolean[];
}

interface State {
  checked: boolean[];
}

export class ItemList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  private handleChecked(index) {
    var checkedList = this.state.checked;
    if (this.state.checked[index] === true) {
      checkedList[index] = false;
    } else {
      checkedList[index] = true;
    }
    this.setState({ checked: checkedList });
  }

  render() {
    return (
      <div className={this.props.styleClass}>
        <h1>
          <b>Shopping List</b>
        </h1>
        <div className="section-content-shopping-list">
          {this.props.itemList.map((itemList, index) => {
            return (
              <div key={index} className="left-align-ShoppingList">
                <Checkbox
                  checked={this.state.checked[index]}
                  label={
                    itemList.quantity +
                    " " +
                    itemList.quantityType.name +
                    " " +
                    itemList.content
                  }
                  onChange={this.handleChecked.bind(this, index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
