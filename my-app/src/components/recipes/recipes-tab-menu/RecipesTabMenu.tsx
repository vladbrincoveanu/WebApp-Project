import * as React from "react";
import * as classNames from "classnames";
import { Link, Redirect } from "react-router-dom";
import "./recipes-tab-menu.css";
import { observer, inject } from "mobx-react";
import { ViewStore } from "../../../store/view-store";
import { HeaderTabs } from "../../../view-models/header-tabs";
import { RecipesTabs } from "../../../view-models/recipes-tabs";
import { IngredientStore } from "../../../store/ingredient-store";

interface Props {
  viewStore: ViewStore;
  ingredientStore: IngredientStore;
}

@inject("viewStore")
@inject("ingredientStore")
@observer
class RecipesTabMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.props.viewStore.changeActiveHeaderTab(HeaderTabs.recipes);
  }
  componentDidUpdate() {
    this.props.ingredientStore.resetIngredients();
  }

  isActive(tab: RecipesTabs) {
    return this.props.viewStore.activeRecipesTab === tab;
  }

  public render() {
    return (
      <div>
        <div className="header-tabs">
          <ul className="recipe-tab-menu tabs">
            <li
              className={classNames({
                active: this.isActive(RecipesTabs.add),
                "add-recipe-tab": true,
                "recipe-tab-menu": true
              })}
            >
              <Link to="/recipes/add">Add</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(RecipesTabs.all),

                "all-recipe-tab": true,
                "recipe-tab-menu": true
              })}
            >
              <Link to="/recipes/all">All</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RecipesTabMenu;
