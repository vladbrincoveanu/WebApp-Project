import * as React from "react";
import "../recipe-view.css";
import { Checkbox } from "@blueprintjs/core";
import { IngredientModel } from "../../../../view-models/ingredients";

interface Props {
  ingredients: IngredientModel[];
  styleClass: string;
  checked: boolean[];
}

interface State {
  checked: boolean[];
}

export class Ingredients extends React.Component<Props, State> {
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
        <h2>Ingredients</h2>
        <div className="section-content">
          {this.props.ingredients.map((ingredient, index) => {
            return (
              <div key={index} className="left-align">
                <Checkbox
                  checked={this.state.checked[index]}
                  label={
                    ingredient.quantity +
                    " " +
                    ingredient.quantityType.name +
                    " " +
                    ingredient.name
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
