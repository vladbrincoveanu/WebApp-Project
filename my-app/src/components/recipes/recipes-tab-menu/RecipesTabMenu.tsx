import * as React from "react";
import * as classNames from "classnames";
import { Link, Redirect } from "react-router-dom";
import "./recipes-tab-menu.css";
import { observer, inject } from "mobx-react";
import { ViewStore } from "../../../store/view-store";
import { HeaderTabs } from "../../../view-models/header-tabs";
import { RecipesTabs } from "../../../view-models/recipes-tabs";
import { IngredientStore } from "../../../store/ingredient-store";
import { LocationDescriptor } from "history";

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

  private checkAdmin(data: string | undefined) {
    if (data == undefined) return "Error";
    console.log(data);
    if (data == "DA") {
      return "/admin";
    } else {
      return "/user";
    }
  }

  private linkGenerator(id: number): LocationDescriptor {
    localStorage.setItem("logged", "");
    var nullCheck = localStorage.getItem("user");
    if (nullCheck == null) {
    } else {
      var user: any = JSON.parse(nullCheck);
    }
    if (id == 1) {
      return this.checkAdmin(user.userName) + "/recipes/add";
    } else {
      return this.checkAdmin(user.userName) + "/recipes/all";
    }
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
              <Link to={this.linkGenerator(1)}>Add</Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(RecipesTabs.all),

                "all-recipe-tab": true,
                "recipe-tab-menu": true
              })}
            >
              <Link to={this.linkGenerator(2)}>All</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RecipesTabMenu;
