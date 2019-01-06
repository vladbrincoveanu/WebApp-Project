import * as React from "react";
import { QuantityType } from "../../../../view-models/quantity-type";
import { IngredientModel } from "../../../../view-models/ingredients";
import IngredientView from "./IngredientView";
import { inject, observer } from "mobx-react";
import { IngredientStore } from "../../../../store/ingredient-store";
import Button from "../../../shared/button/button";
import { IngredientErrMsg } from "./IngredientErrMsg";

interface Props {
  ingredientStore: IngredientStore;
  handleIngredientsChange: Function;
  validateIngredient: Function;
  handleIngredientsError: Function;
}

interface State {
  activeIngredient: {
    id: number;
    name: string;
    quantity: number;
    quantityType: QuantityType;
    discount: number;
  };
  errMsg: IngredientErrMsg;
}

const activeIngredient: IngredientModel = {
  id: 0,
  name: "",
  quantity: 0.1,
  discount: 0.1,
  quantityType: new QuantityType({ id: 0, name: "UNKNOWN" })
};

const emptyErrMsg = IngredientErrMsg.empty();

const initialState: State = {
  activeIngredient: activeIngredient,
  errMsg: emptyErrMsg
};

@inject("ingredientStore")
@observer
export class IngredientAddForm extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  private handleAddIngredient() {
    this.props.handleIngredientsError(false);
    const errMsg = this.props.validateIngredient(this.state.activeIngredient);
    if (errMsg.isEqual(emptyErrMsg)) {
      this.props.ingredientStore.addIngredient(this.state.activeIngredient);
      this.setState({ errMsg: emptyErrMsg });
      this.resetIngredient();
    } else {
      this.setState({ errMsg: errMsg });
    }
  }

  private resetIngredient() {
    this.setState(initialState);
  }

  private handleIngredientNameChanged(event: any) {
    this.setState({
      ...this.state,
      activeIngredient: {
        ...this.state.activeIngredient,
        name: event.target.value
      }
    });
  }

  private handleIngredientQuantityChanged(event: any) {
    this.setState({
      ...this.state,
      activeIngredient: {
        ...this.state.activeIngredient,
        quantity: event.target.value
      }
    });
  }

  private handleIngredientQuantityTypeChanged(event: any) {
    this.setState({
      ...this.state,
      activeIngredient: {
        ...this.state.activeIngredient,
        quantityType: this.props.ingredientStore.quantityTypes[
          event.target.value
        ]
      }
    });
  }

  render() {
    return (
      <div className="bp3-form-group bp3-inline recipe-ingredients">
        <label className="bp3-label">Ingredients *</label>
        <IngredientView
          ingredient={this.state.activeIngredient}
          quantityTypes={this.props.ingredientStore.quantityTypes}
          editable={true}
          errMsg={this.state.errMsg}
          onIngredientNameChange={this.handleIngredientNameChanged.bind(this)}
          onIngredientQuantityChange={this.handleIngredientQuantityChanged.bind(
            this
          )}
          onIngredientQuantityTypeChange={this.handleIngredientQuantityTypeChanged.bind(
            this
          )}
        />
        <Button onClick={this.handleAddIngredient.bind(this)} value={"+"} />
      </div>
    );
  }
}
