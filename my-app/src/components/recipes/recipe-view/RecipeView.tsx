import * as React from "react";
import { RecipesStore } from "../../../store/recipe-store";
import { inject, observer } from "mobx-react";
import "./recipe-view.css";
import { RecipeViewModel } from "../../../view-models/recipe";
import { Icon, Overlay, Tooltip } from "@blueprintjs/core";
import { Ingredients } from "./recipe-view-elements/Ingredients";
import { Steps } from "./recipe-view-elements/Steps";
import { IngredientStore } from "../../../store/ingredient-store";
import Lightbox from "lightbox-react";
import { Redirect } from "react-router-dom";
import { LightboxVideoComponent } from "./recipe-view-elements/LightboxComponent";
import { Details } from "./recipe-view-elements/Details";
import Rec from "../../../images/recipe.jpg";

interface Match {
  params: {
    id: number;
  };
}

interface Props {
  recipesStore: RecipesStore;
  ingredientStore: IngredientStore;
  match: Match;
}

interface State {
  isOpenIngredients: boolean;
  isOpenSteps: boolean;
  isOpenImage: boolean;
  isOpenVideo: boolean;
  checked: boolean[];
  activeRecipe: RecipeViewModel;
  redirectTo: string;
}

const initialState: State = {
  isOpenIngredients: false,
  isOpenSteps: false,
  isOpenImage: false,
  isOpenVideo: false,
  checked: [],
  activeRecipe: {
    id: 0,
    name: "",
    ingredients: [],
    steps: [],
    rating: 0,
    summary: ""
  },
  redirectTo: ""
};

@inject("recipesStore")
@inject("ingredientStore")
@observer
export class RecipeView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;

    let recipeId = props.match.params.id;
    if (recipeId) {
      this.props.recipesStore.loadActiveRecipe(
        recipeId,
        this.loadRecipe.bind(this)
      );
    }
  }

  private loadRecipe(recipe: RecipeViewModel): void {
    this.setState({
      activeRecipe: recipe
    });
  }

  private handleOpenIngredients = () =>
    this.setState({ isOpenIngredients: true });

  private handleCloseIngredients = () =>
    this.setState({ isOpenIngredients: false });

  private handleOpenSteps = () => this.setState({ isOpenSteps: true });

  private handleCloseSteps = () => this.setState({ isOpenSteps: false });

  private handleEditClick = () => {
    this.setState({
      redirectTo: "/recipes/edit/" + this.state.activeRecipe.id
    });
  };

  private handleShoppingCartClick = () => {
    this.setState({
      redirectTo: "/shoppingList/addRecipe/" + this.state.activeRecipe.id
    });
  };

  private handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return null;
  }

  private handleCloseLightbox = () => this.setState({ isOpenImage: false });

  private showIngredientsOverlay() {
    return (
      <Overlay
        isOpen={this.state.isOpenIngredients}
        hasBackdrop={false}
        autoFocus={true}
        usePortal={false}
      >
        <div className="overlay-content">
          <div className="minimize-button">
            <Icon
              color="#f25800"
              icon="minimize"
              iconSize={20}
              onClick={this.handleCloseIngredients}
            />
          </div>
          <br />
          <Ingredients
            ingredients={this.state.activeRecipe.ingredients}
            styleClass="big-ingredients"
            checked={this.state.checked}
          />
        </div>
      </Overlay>
    );
  }

  private showStepsOverlay() {
    return (
      <Overlay
        isOpen={this.state.isOpenSteps}
        hasBackdrop={false}
        autoFocus={true}
        usePortal={false}
      >
        <div className="overlay-content">
          <div className="minimize-button">
            <Icon
              color="#f25800"
              icon="minimize"
              iconSize={20}
              onClick={this.handleCloseSteps}
            />
          </div>
          <br />
          <Steps steps={this.state.activeRecipe.steps} styleClass="big-steps" />
        </div>
      </Overlay>
    );
  }

  private showIngredients() {
    return (
      <div className="column border-section">
        <div className="recipe-expand-button">
          <Icon
            color="#f25800"
            icon="maximize"
            iconSize={20}
            onClick={this.handleOpenIngredients}
          />
        </div>
        <div className="bookmark-icon">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <Ingredients
          ingredients={this.state.activeRecipe.ingredients}
          styleClass="small-ingredients"
          checked={this.state.checked}
        />
      </div>
    );
  }

  private showSteps() {
    return (
      <div className="column border-section">
        <div className="recipe-expand-button">
          <Icon
            color="#f25800"
            icon="maximize"
            iconSize={20}
            onClick={this.handleOpenSteps}
          />
        </div>
        <div className="bookmark-icon">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <Steps steps={this.state.activeRecipe.steps} styleClass="small-steps" />
      </div>
    );
  }

  render() {
    return (
      this.handleRedirect() || (
        <div className="view-container">
          <div className="row">
            <div className="column heading-column">
              <h1 className="heading">{this.state.activeRecipe.name}</h1>
              <div className="icon" onClick={this.handleEditClick}>
                <Tooltip content="Edit recipe" position="top">
                  <Icon icon="edit" iconSize={30} />
                </Tooltip>
              </div>
              <div className="icon" onClick={this.handleShoppingCartClick}>
                <Tooltip content="Add to shopping list" position="top">
                  <Icon icon="shopping-cart" iconSize={30} />
                </Tooltip>
              </div>

              {this.showIngredientsOverlay()}
              {this.showStepsOverlay()}

              <div className="row">
                <img src={Rec} alt="no image" />
                {this.showIngredients()}

                <Details activeRecipe={this.state.activeRecipe} />
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
