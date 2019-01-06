import "./recipe-form.css";
import "../../shared/shared-css/list-all.css";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { RecipeDetails } from "./details/RecipeDetails";
import { RecipeSteps } from "./steps/RecipeSteps";
import { Tab, Tabs, Portal, Popover } from "@blueprintjs/core";
import { IngredientStore } from "../../../store/ingredient-store";
import { IngredientModel } from "../../../view-models/ingredients";
import { RecipesStore } from "../../../store/recipe-store";
import { ViewStore } from "../../../store/view-store";
import { RecipesTabs } from "../../../view-models/recipes-tabs";
import { RecipeViewModel } from "../../../view-models/recipe";
import { Icon } from "@blueprintjs/core";
import { StepViewModel } from "../../../view-models/step";
import { RecipeIngredientDetails } from "./ingredients/RecipeIngredientDetails";
import Modal from "react-responsive-modal";
import { RecipeDeleteModal } from "./RecipeDeleteModal";
import { RecipeSaveModel } from "./RecipeSaveModel";
interface Match {
  params: {
    id: number;
  };
}

interface Props {
  recipesStore: RecipesStore;
  viewStore: ViewStore;
  match: Match;
  ingredientStore: IngredientStore;
}

interface State {
  activeRecipe: {
    id: number;
    name: string;
    ingredients: IngredientModel[];
    summary: string;
    steps: StepViewModel[];
    rating: number;
  };
  deleteModalIsOpen: boolean;
  saveModalIsOpen: boolean;
}

const activeRecipe: RecipeViewModel = {
  id: 0,
  steps: [],
  ingredients: [],
  name: "",
  summary: "",
  rating: 0
};

const initialState: State = {
  activeRecipe: activeRecipe,
  deleteModalIsOpen: false,
  saveModalIsOpen: false
};

@inject("recipesStore")
@inject("viewStore")
@inject("ingredientStore")
@observer
export class RecipeForm extends React.Component<Props, State> {
  private saveInput: any;
  private savePressed = false;
  constructor(props: Props) {
    super(props);
    let recipeId = props.match.params.id;
    this.state = initialState;
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
    this.props.ingredientStore.updateIngredients(recipe.ingredients);
  }

  componentWillMount() {
    this.props.viewStore.changeActiveRecipesTab(RecipesTabs.add);
  }

  componentDidMount() {
    this.resetRecipe();
  }
  private handleSubmit(callback?: Function) {
    this.handleIngredientsChange(this.props.ingredientStore.ingredients);
    this.handleInfoChange();

    console.log(this.state.activeRecipe);
    this.props.recipesStore.AddOrUpdateRecipe(
      this.state.activeRecipe,
      callback
    );

    this.props.ingredientStore.resetIngredients();
    this.resetActiveRecipeMediaFile();
    this.resetRecipe();
    this.resetModal();
  }

  private resetActiveRecipeMediaFile() {
    this.setState({
      activeRecipe: { ...this.state.activeRecipe, recipesMediaFiles: [] }
    });
  }

  private resetModal() {
    this.setState({ saveModalIsOpen: true });
  }
  private resetRecipe() {
    this.setState({ ...initialState });
  }

  private handleRecipeDetailsNameChange(name: string) {
    this.handleDetailsError(false);
    this.setState({
      activeRecipe: { ...this.state.activeRecipe, name: name }
    });
  }

  private handleRecipeDetailsSummaryChange(summary: string) {
    this.handleDetailsError(false);
    this.setState({
      activeRecipe: {
        ...this.state.activeRecipe,
        summary: summary
      }
    });
  }

  private handleStepChange(steps: string[]) {
    let arraySteps: StepViewModel[] = [];

    steps.map((element, key) => {
      arraySteps.push(new StepViewModel(element));
    });

    this.setState({
      activeRecipe: {
        ...this.state.activeRecipe,
        steps: arraySteps
      }
    });
  }

  private handleRatingDetails(ratingNr: number) {
    this.setState({
      activeRecipe: { ...this.state.activeRecipe, rating: ratingNr }
    });
  }

  private handleStepsError(isError: boolean) {
    let stepsTab = document.getElementById(
      "bp3-tab-title_RecipeFormTabs_StepsTab"
    );

    if (stepsTab) {
      if (isError) {
        stepsTab.classList.replace("recipe-tab", "recipe-tab-error");
      } else {
        stepsTab.classList.replace("recipe-tab-error", "recipe-tab");
      }
    }
  }

  private handleIngredientsError(isError: boolean) {
    let ingredientsTab = document.getElementById(
      "bp3-tab-title_RecipeFormTabs_IngredientsTab"
    );
    if (ingredientsTab) {
      if (isError) {
        ingredientsTab.classList.replace("recipe-tab", "recipe-tab-error");
      } else {
        ingredientsTab.classList.replace("recipe-tab-error", "recipe-tab");
      }
    }
  }

  private handleDetailsError(isError: boolean) {
    let detailsTab = document.getElementById(
      "bp3-tab-title_RecipeFormTabs_DetailsTab"
    );
    if (detailsTab) {
      if (isError) {
        detailsTab.classList.replace("recipe-tab", "recipe-tab-error");
      } else {
        detailsTab.classList.replace("recipe-tab-error", "recipe-tab");
      }
    }
  }

  private handleIngredientsChange(ingredients: IngredientModel[]) {
    let arrayIngredients: IngredientModel[] = [];
    ingredients.map(element => {
      arrayIngredients.push(
        new IngredientModel({
          name: element.name,
          quantity: element.quantity,
          quantityType: { id: element.quantityType.id }
        })
      );
    });

    let stateCopy = this.state;
    stateCopy.activeRecipe.ingredients = arrayIngredients;
    this.setState(stateCopy);
  }

  private handleInfoChange() {
    this.setState({
      activeRecipe: {
        ...this.state.activeRecipe
      }
    });
  }

  private handleRecipeDetailsDifficultyChange(difficulty: string) {
    this.setState({
      activeRecipe: {
        ...this.state.activeRecipe,
        difficulty: difficulty
      }
    });
  }

  private handleDeleteBtnPressed(): void {
    if (this.state.deleteModalIsOpen) {
    } else {
      this.setState({ deleteModalIsOpen: true });
    }
  }

  private handleSavedBtnPressed(): void {
    this.savePressed = true;
    let stepsError = false;
    let ingredientsError = false;
    let detailsError = false;

    if (this.state.activeRecipe.steps.length === 0) {
      this.handleStepsError(true);
      stepsError = true;
    } else {
      this.handleStepsError(false);
    }

    if (this.props.ingredientStore.ingredients.length === 0) {
      this.handleIngredientsError(true);
      ingredientsError = true;
    } else {
      this.handleIngredientsError(false);
    }

    if (
      this.state.activeRecipe.name === "" ||
      this.state.activeRecipe.summary === ""
    ) {
      this.handleDetailsError(true);
      detailsError = true;
    } else {
      this.handleDetailsError(false);
    }

    if (stepsError || ingredientsError || detailsError) {
      return;
    }

    if (this.state.saveModalIsOpen) {
    } else {
      this.setState({ saveModalIsOpen: true });
    }
  }

  private handleModalClose(): void {
    this.setState({ deleteModalIsOpen: false });
  }

  private handleModalSave(): void {
    this.setState({ saveModalIsOpen: false });
  }

  render() {
    return (
      <div className="scrollbarStyle add-edit-recipe">
        <form encType="multipart/form-data" className="recipe-form">
          <Tabs id="RecipeFormTabs">
            <Tab
              id="DetailsTab"
              title={
                <div>
                  Details
                  <Icon icon="error" />
                </div>
              }
              className="recipe-tab"
              panel={
                <RecipeDetails
                  savePressed={this.savePressed}
                  recipe={this.state.activeRecipe}
                  handleRecipeDetailsNameChange={this.handleRecipeDetailsNameChange.bind(
                    this
                  )}
                  handleRecipeDetailsSummaryChange={this.handleRecipeDetailsSummaryChange.bind(
                    this
                  )}
                  handleRatingDetails={this.handleRatingDetails.bind(this)}
                />
              }
            />
            <Tab
              id="IngredientsTab"
              title={
                <div>
                  Ingredients
                  <Icon icon="error" />
                </div>
              }
              className="recipe-tab"
              panel={
                <RecipeIngredientDetails
                  ingredientStore={this.props.ingredientStore}
                  handleIngredientsChange={this.handleIngredientsChange.bind(
                    this
                  )}
                  handleIngredientsError={this.handleIngredientsError.bind(
                    this
                  )}
                />
              }
            />
            <Tab
              id="StepsTab"
              title={
                <div>
                  Steps
                  <Icon icon="error" />
                </div>
              }
              className="recipe-tab"
              panel={
                <RecipeSteps
                  recipe={this.state.activeRecipe}
                  handleStepChange={this.handleStepChange.bind(this)}
                  handleStepsError={this.handleStepsError.bind(this)}
                />
              }
            />
          </Tabs>
          <div className="submit-button">
            {this.props.match.params.id && (
              <React.Fragment>
                <button
                  type="button"
                  className="bp3-button bp3-intent-danger"
                  onClick={this.handleDeleteBtnPressed.bind(this)}
                >
                  Delete
                </button>
                <RecipeDeleteModal
                  open={this.state.deleteModalIsOpen}
                  onModalClose={this.handleModalClose.bind(this)}
                  recipeId={this.props.match.params.id}
                  recipesStore={this.props.recipesStore}
                />
              </React.Fragment>
            )}
            <React.Fragment>
              <button
                type="button"
                className="bp3-button bp3-intent-primary save-recipe"
                onClick={this.handleSavedBtnPressed.bind(this)}
              >
                Save
              </button>

              <RecipeSaveModel
                open={this.state.saveModalIsOpen}
                handleSubmit={this.handleSubmit.bind(this)}
                onModalClose={this.handleModalSave.bind(this)}
                recipesStore={this.props.recipesStore}
              />
            </React.Fragment>
          </div>
        </form>
      </div>
    );
  }
}
