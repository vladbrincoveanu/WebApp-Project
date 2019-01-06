import * as React from "react";
import { IngredientModel } from "../../../../view-models/ingredients";
import IngredientView from "./IngredientView";
import { IngredientStore } from "../../../../store/ingredient-store";
import { inject } from "mobx-react";
import Button from "../../../shared/button/button";
import { IngredientErrMsg } from "./IngredientErrMsg";

interface Props {
  ingredientStore: IngredientStore;
  index: number;
  handleIngredientsChange: Function;
  validateIngredient: Function;
}

interface State {
  isHidden: boolean;
  editable: boolean;
  editedIngredient: IngredientModel;
  errMsg: IngredientErrMsg;
}

const emptyErrMsg = IngredientErrMsg.empty();

const initialState = {
  isHidden: true,
  editable: false,
  editedIngredient: new IngredientModel(""),
  errMsg: emptyErrMsg
};

@inject("ingredientStore")
export class IngredientListItemForm extends React.Component<Props, State> {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = initialState;
    this.state.editedIngredient = {
      ...this.props.ingredientStore.ingredients[this.props.index]
    };
  }

  private handleEditIngredient() {
    this.setState({
      isHidden: false,
      editable: true,
      editedIngredient: {
        ...this.props.ingredientStore.ingredients[this.props.index]
      }
    });
  }

  private handleDeleteIngredient() {
    this.props.ingredientStore.deleteIngredient(this.props.index);
    this.props.handleIngredientsChange(this.props.ingredientStore.ingredients);
  }

  private handleUpdateIngredient() {
    const errMsg = this.props.validateIngredient(this.state.editedIngredient);
    if (errMsg.isEqual(emptyErrMsg)) {
      this.props.ingredientStore.updateIngredient(
        this.state.editedIngredient,
        this.props.index
      );
      this.props.handleIngredientsChange(
        this.props.ingredientStore.ingredients
      );
      this.setState({ isHidden: true, editable: false, errMsg: emptyErrMsg });
    } else {
      this.setState({ errMsg: errMsg });
    }
  }

  private handleIngredientNameChanged(event: any) {
    this.setState({
      ...this.state,
      editedIngredient: {
        ...this.state.editedIngredient,
        name: event.target.value
      }
    });
  }

  private handleIngredientQuantityChanged(event: any) {
    this.setState({
      ...this.state,
      editedIngredient: {
        ...this.state.editedIngredient,
        quantity: event.target.value
      }
    });
  }

  private handleIngredientQuantityTypeChanged(event: any) {
    this.setState({
      ...this.state,
      editedIngredient: {
        ...this.state.editedIngredient,
        quantityType: this.props.ingredientStore.quantityTypes[
          event.target.value
        ]
      }
    });
  }

  render() {
    return (
      <div className="bp3-form-group bp3-inline recipe-ingredients">
        <IngredientView
          ingredient={
            this.state.editable
              ? this.state.editedIngredient
              : this.props.ingredientStore.ingredients[this.props.index]
          }
          quantityTypes={this.props.ingredientStore.quantityTypes}
          editable={this.state.editable}
          errMsg={this.state.errMsg}
          onIngredientNameChange={this.handleIngredientNameChanged.bind(this)}
          onIngredientQuantityChange={this.handleIngredientQuantityChanged.bind(
            this
          )}
          onIngredientQuantityTypeChange={this.handleIngredientQuantityTypeChanged.bind(
            this
          )}
        />
        <Button onClick={this.handleDeleteIngredient.bind(this)} value={"-"} />
        {this.state.isHidden ? (
          <Button
            onClick={this.handleEditIngredient.bind(this)}
            value={"Edit"}
          />
        ) : null}
        {this.state.isHidden ? null : (
          <Button
            onClick={this.handleUpdateIngredient.bind(this)}
            value="Save"
          />
        )}
      </div>
    );
  }
}
