import * as React from "react";
import { IngredientModel } from "../../../../view-models/ingredients";
import { QuantityType } from "../../../../view-models/quantity-type";

interface Props {
  editable: boolean;
  quantityTypes: QuantityType[];
  ingredient: IngredientModel;
  onIngredientNameChange: Function;
  onIngredientQuantityChange: Function;
  onIngredientQuantityTypeChange: Function;
  errMsg: any;
}

class IngredientView extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let { ingredient, editable, errMsg } = this.props;
    return (
      <React.Fragment>
        <div className="recipe-ingredients-name">
          <input
            className="bp3-input recipe-ingredients-name"
            type="text"
            name="ingredient-name"
            placeholder="Name"
            value={ingredient.name}
            onChange={this.props.onIngredientNameChange.bind(this)}
            disabled={!editable}
          />
          <span className="err recipe-ingredients-name">{errMsg.name}</span>
        </div>
        <div className="recipe-ingredients-quantity">
          <input
            className="bp3-input recipe-indredients-quantity"
            type="number"
            name="ingredient-quantity"
            placeholder="Quantity"
            min={0.1}
            step="0.1"
            value={ingredient.quantity}
            onChange={this.props.onIngredientQuantityChange.bind(this)}
            disabled={!editable}
          />
          <span className="err recipe-indredients-quantity">
            {errMsg.quantity}
          </span>
        </div>
        <div className="recipe-ingredients-quantity-type">
          <select
            className="bp3-select recipe-ingredients-quantity-type"
            onChange={this.props.onIngredientQuantityTypeChange.bind(this)}
            disabled={!editable}
          >
            {this.props.quantityTypes.map(function(qtype, index) {
              return (
                <option
                  key={index}
                  value={qtype.id > 0 ? qtype.id : ""}
                  selected={ingredient.quantityType.id === qtype.id}
                  disabled={qtype.id === 0}
                >
                  {qtype.id > 0 ? qtype.name : "Select type..."}
                </option>
              );
            })}
          </select>
          <span className="err">{errMsg.quantityType}</span>
        </div>
      </React.Fragment>
    );
  }
}

export default IngredientView;
