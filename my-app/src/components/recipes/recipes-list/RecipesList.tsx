import * as React from "react";
import { inject, observer } from "mobx-react";
import { RecipesStore } from "../../../store/recipe-store";
import { ViewStore } from "../../../store/view-store";
import { RecipesTabs } from "../../../view-models/recipes-tabs";
import "../../shared/shared-css/list-all.css";
import { RecipeListView } from "../recipe-list-view/RecipeListView";
import { Redirect } from "react-router-dom";
import { RecipeViewModel } from "../../../view-models/recipe";

interface Props {
  recipesStore: RecipesStore;
  viewStore: ViewStore;
  handleRecipeDetails: Function;
}

interface State {
  recipesToOmit: number[];
  recipes: RecipeViewModel[];
  redirectTo: string;
  dataWasReceived: boolean;
  filter: {
    difficulty: string;
    category: string;
  };
}

const initialState: State = {
  recipesToOmit: [],
  recipes: [],
  redirectTo: "",
  dataWasReceived: false,
  filter: { difficulty: "", category: "" }
};

@inject("recipesStore")
@inject("viewStore")
@observer
export class RecipesList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.props.recipesStore.loadRecipes(() =>
      this.setState({
        recipes: this.props.recipesStore.recipes,
        dataWasReceived: true
      })
    );
  }
  newListOfRecipes: RecipeViewModel[] = [];

  componentWillMount() {
    this.props.viewStore.changeActiveRecipesTab(RecipesTabs.all);
  }

  handleRecipesToOmit(recipesToOmit: number[]) {
    this.setState({ recipesToOmit: recipesToOmit });
  }

  handleClick(recipe: RecipeViewModel) {
    this.setState({ redirectTo: "/recipes/edit/" + recipe.id });
  }

  handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return null;
  }

  handleSetFavorites(recipe: RecipeViewModel) {
    this.props.recipesStore.AddOrUpdateRecipe(recipe);
  }

  getRecipiesItems(): RecipeViewModel[] {
    let result = this.props.recipesStore.getRecipies;
    return result;
  }

  render(): React.ReactNode {
    return (
      this.handleRedirect() || (
        <div className="list-all">
          <RecipeListView
            recipes={this.getRecipiesItems.bind(this)()}
            recipesToOmit={this.state.recipesToOmit}
            handleSetFavorites={this.handleSetFavorites.bind(this)}
            waitingForData={!this.state.dataWasReceived}
          />
        </div>
      )
    );
  }
}
