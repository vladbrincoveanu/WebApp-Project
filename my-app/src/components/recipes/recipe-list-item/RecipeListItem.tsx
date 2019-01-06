import * as React from "react";
import { inject, observer } from "mobx-react";
import "../../shared/shared-css/list-all.css";
import "./recipe-list-item.css";
import StarRatingComponent from "react-star-rating-component";
import { Redirect } from "react-router-dom";
import { RecipeViewModel } from "../../../view-models/recipe";
import MyIcon from "../recipe-icon/MyIcon";
import { AnchorButton, Button, Dialog, Intent } from "@blueprintjs/core";
import Cart from "../../../images/cart.png";
import Rec from "../../../images/recipe.jpg";

interface Props {
  recipe: RecipeViewModel;
  handleSetFavorites: Function;
  waitingForData: boolean;
}

interface State {
  redirectTo: string;
  rating: number;
  isOpen: boolean;
}

@observer
export class RecipeListItem extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirectTo: "",
      rating: 0,
      isOpen: false
    };
  }

  private handleAddShoppingCart(event: any) {
    this.setState({
      redirectTo: "/shoppingList/addRecipe/" + this.props.recipe.id
    });
  }

  private handleDeleteFavorites(event: any) {
    let updatedRecipe = this.props.recipe;
    this.props.handleSetFavorites(updatedRecipe);
    this.handleClose();
  }

  private handleAddFavorites(event: any) {
    let updatedRecipe = this.props.recipe;
    this.props.handleSetFavorites(updatedRecipe);
    this.handleClose();
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  handleClick(recipe: RecipeViewModel) {
    this.setState({ redirectTo: "/recipe/" + recipe.id });
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  private handleOpen = () => this.setState({ isOpen: true });
  private handleClose = () => this.setState({ isOpen: false });
  render() {
    return (
      this.handleRedirect() || (
        <div className="list-item">
          <div onClick={() => this.handleClick(this.props.recipe)}>
            <MyIcon src={Rec} className="list-item-photo" />
          </div>
          <div className="summary_field">{this.props.recipe.name}</div>
          <div className="rating-comp">
            <StarRatingComponent
              name="rating"
              editing={true}
              starColor="#0D47A1"
              renderStarIcon={() => <span className="heart" />}
              starCount={5}
              emptyStarColor="#D6D6D6"
              value={this.props.recipe.rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>

          <button
            type="button"
            className="recipe-all-button recipe-button-cart"
            onClick={this.handleAddShoppingCart.bind(this)}
          >
            <img className="shopping-cart" src={Cart} />
          </button>
        </div>
      )
    );
  }
}
