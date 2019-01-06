import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "./item.css";
import { QuantityType } from "../../../../../view-models/quantity-type";
import { Constants } from "../../../../shared/constants";

export interface ItemProps {
  name: string;
  id: number;
  quantity: number;
  quantityType: QuantityType;
  handleItemTextUpdate: Function;
  handleItemQuantityUpdate: Function;
  handleItemTypeUpdate: Function;
  handleRemove: Function;
}

export class Item extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
    this.state = { content: this.props.name, quantity: this.props.quantity };
  }

  private handleChangeText(e: any): void {
    this.setState({ content: e.target.value });
    this.props.handleItemTextUpdate(this.props.id, e.target.value);
  }

  private handleChangeNumber(e: any): void {
    this.setState({ quantity: e.target.value });
    this.props.handleItemQuantityUpdate(this.props.id, e.target.value);
  }

  private handleChangeQuantityType(e: any): void {
    let quantityType = new QuantityType({
      id: e.target.value,
      name: Constants.itemQuantityTypes[e.target.value]
    });
    this.setState({
      quantityType: quantityType
    });
    this.props.handleItemTypeUpdate(this.props.id, quantityType);
  }

  private handleDeleteItem(): void {
    this.props.handleRemove(this.props.id);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <textarea
            value={this.props.name}
            className="form-control"
            onChange={this.handleChangeText.bind(this)}
          />
          <input
            type="number"
            value={this.props.quantity}
            className="form-control"
            onChange={this.handleChangeNumber.bind(this)}
          />
          <select
            className="form-control"
            onChange={this.handleChangeQuantityType.bind(this)}
          >
            {Constants.itemQuantityTypes.map((qtype, index) => {
              return (
                <option
                  key={index}
                  value={index > 0 ? index : ""}
                  selected={this.props.quantityType.id == index}
                  disabled={index === 0}
                >
                  {index > 0 ? qtype : "Select type..."}
                </option>
              );
            })}
          </select>
          <Icon
            className="shopping-list-manage"
            icon="minus"
            onClick={this.handleDeleteItem.bind(this)}
          />
        </div>
      </form>
    );
  }
}
