import * as React from "react";
import "./recipe-ingredients.css";
import { IngredientAddForm } from "./IngredientAddForm";
import { IngredientListItemForm } from "./IngredientListItemForm";
import { IngredientStore } from "../../../../store/ingredient-store";
import { inject, observer } from "mobx-react";
import { IngredientModel } from "../../../../view-models/ingredients";
import { IngredientErrMsg } from "./IngredientErrMsg";

interface Props {
  ingredientStore: IngredientStore;
  handleIngredientsChange: Function;
  handleIngredientsError: Function;
}

@inject("ingredientStore")
@observer
export class RecipeIngredientDetails extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.props.ingredientStore.loadQuantityTypes();
  }

  private validateIngredient(ingredient: IngredientModel): IngredientErrMsg {
    let errMsg = new IngredientErrMsg();

    if (ingredient.name == "") {
      errMsg.name = "Name field is required.";
    }
    if (ingredient.quantity == 0) {
      errMsg.quantity = "Quantity must be greater than 0.";
    }
    if (ingredient.quantityType.id == 0) {
      errMsg.quantityType = "Quantity type field is required.";
    }
    return errMsg;
  }

  render() {
    const self = this;
    return (
      <React.Fragment>
        <IngredientAddForm
          handleIngredientsError={this.props.handleIngredientsError}
          ingredientStore={this.props.ingredientStore}
          handleIngredientsChange={this.props.handleIngredientsChange}
          validateIngredient={this.validateIngredient.bind(this)}
        />
        {this.props.ingredientStore.ingredients.map(function(
          ingredient,
          index
        ) {
          return (
            <IngredientListItemForm
              ingredientStore={self.props.ingredientStore}
              index={index}
              handleIngredientsChange={self.props.handleIngredientsChange}
              validateIngredient={self.validateIngredient.bind(self)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
