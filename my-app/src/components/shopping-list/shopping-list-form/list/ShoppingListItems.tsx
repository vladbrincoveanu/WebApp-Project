import * as React from "react";
import "./shopping-list-itemlist.css";
import { Icon } from "@blueprintjs/core";
import { Item } from "./added-items/Item";
import { ItemListViewModel } from "../../../../view-models/itemList";
import { QuantityType } from "../../../../view-models/quantity-type";
import { Constants } from "../../../shared/constants";

export interface Props {
  items: ItemListViewModel[];
  handleItemsChange: Function;
}

export interface State {
  itemList: ItemListViewModel[];
  currentItem: CurrentItem;
}

interface CurrentItem {
  value: string;
  quantity: number;
  quantityType: QuantityType;
}

const initialState = {
  itemList: [],
  currentItem: {
    value: "",
    quantity: 0,
    quantityType: new QuantityType({ id: 0, name: "" })
  }
};

export class ShoppingListItems extends React.Component<Props, State> {
  private itemInput: any;
  private itemQuantity: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState: State) {
    if (
      this.props.items.length !== prevState.itemList.length &&
      prevState.itemList.length > 0
    ) {
      this.setState({ itemList: [] });
    }
    if (this.props.items && prevProps !== this.props) {
      this.setState({ itemList: this.props.items });
    }
  }

  private handleAddStep(): void {
    if (this.itemInput.value == "") {
      this.itemInput.classList.replace("valid", "invalid");
      return;
    }
    if (this.itemQuantity.value == 0) {
      this.itemQuantity.classList.replace("valid", "invalid");
      return;
    }

    this.itemInput.classList.replace("invalid", "valid");
    var stateCpy = { ...this.state };
    stateCpy.itemList.push(
      new ItemListViewModel(
        this.state.currentItem.value,
        this.state.currentItem.quantity,
        this.state.currentItem.quantityType
      )
    );
    this.setState({ itemList: stateCpy.itemList });
    this.setState({ currentItem: initialState.currentItem });
    this.passData();
    this.clearContents();
  }

  private clearContents(): void {
    this.itemInput.value = "";
    this.itemQuantity.value = "";
  }

  private handleChangeText(event: any): void {
    this.setState({
      currentItem: { ...this.state.currentItem, value: event.target.value }
    });
  }

  private handleChangeNumber(event: any): void {
    this.setState({
      currentItem: { ...this.state.currentItem, quantity: event.target.value }
    });
  }

  private onItemQuantityTypeChange(event: any) {
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        quantityType: new QuantityType({
          id: event.target.value,
          name: Constants.itemQuantityTypes[event.target.value]
        })
      }
    });
  }

  private handleRemove(id: number): void {
    this.state.itemList.splice(id, 1);
    this.setState(this.state);
    this.passData();
  }

  private handleItemTextUpdate(id: number, content: string): void {
    this.state.itemList[id].content = content;
    this.setState({ itemList: this.state.itemList });
    this.passData();
  }

  private handleItemQuantityUpdate(id: number, content: number): void {
    this.state.itemList[id].quantity = content;
    this.setState({ itemList: this.state.itemList });
    this.passData();
  }

  private handleItemTypeUpdate(id: number, quantityType: QuantityType): void {
    this.state.itemList[id].quantityType = quantityType;
    this.setState({ itemList: this.state.itemList });
    this.passData();
  }

  private passData(): void {
    this.props.handleItemsChange(this.state.itemList);
  }

  render() {
    return (
      <div>
        <label className="bp3-label-editItemLabel">Items*</label>
        <form>
          <textarea
            defaultValue=""
            ref={ref => {
              this.itemInput = ref;
            }}
            maxLength={30}
            className="bp3-intent primary shopping-list-item valid  {Classes.ELEVATION_4}"
            onChange={this.handleChangeText.bind(this)}
          />
          <div className="form-group">
            <label htmlFor="Quantity">Quantity</label>
            <input
              type="number"
              defaultValue=""
              ref={ref => {
                this.itemQuantity = ref;
              }}
              min={0.1}
              step={0.1}
              className="form-control valid"
              id="Quantity"
              onChange={this.handleChangeNumber.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor=" Type"> Quantity type</label>
            <select
              id="Quantity type"
              className="form-control"
              onChange={this.onItemQuantityTypeChange.bind(this)}
            >
              {Constants.itemQuantityTypes.map(function(qtype, index) {
                return (
                  <option
                    key={index}
                    value={index > 0 ? index : ""}
                    selected={index === 0}
                    disabled={index === 0}
                  >
                    {index > 0 ? qtype : "Select type..."}
                  </option>
                );
              })}
            </select>
          </div>
          <Icon
            className="shopping-list-manage"
            icon="plus"
            onClick={this.handleAddStep.bind(this)}
          />
        </form>

        {this.state.itemList.map((item, key) => {
          return (
            <Item
              key={key}
              quantity={item.quantity}
              name={item.content}
              quantityType={item.quantityType}
              id={key}
              handleRemove={this.handleRemove.bind(this)}
              handleItemTextUpdate={this.handleItemTextUpdate.bind(this)}
              handleItemQuantityUpdate={this.handleItemQuantityUpdate.bind(
                this
              )}
              handleItemTypeUpdate={this.handleItemTypeUpdate.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}
