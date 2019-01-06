import "./shopping-list-form.css";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ShoppingListDetails } from "./details/ShoppingListDetails";
import { Tab, Tabs, Button, Icon, Tag } from "@blueprintjs/core";
import { ShoppingListStore } from "../../../store/shopping-list-store";
import { ViewStore } from "../../../store/view-store";
import { ShoppingListTabs } from "../../../view-models/shopping-list-tabs";
import { ShoppingListViewModel } from "../../../view-models/shopping-list";
import { ItemListViewModel } from "../../../view-models/itemList";
import { ShoppingListItems } from "./list/ShoppingListItems";
import { RecipesStore } from "../../../store/recipe-store";
import { RecipeViewModel } from "../../../view-models/recipe";
import ShoppingListSaveModal from "./ShoppingListSaveModal";
import { IngredientModel } from "src/view-models/ingredients";

interface Match {
  params: {
    id: number;
  };
}

interface Match {
  params: {
    id: number;
  };
}

interface State {
  activeShoppingList: ShoppingListViewModel;
  saveModalIsOpen: boolean;
}

interface Props {
  shoppingListStore: ShoppingListStore;
  viewStore: ViewStore;
  recipesStore: RecipesStore;
  match: Match;
  location: Location;
}

const activeShoppingList: ShoppingListViewModel = {
  id: 0,
  name: "",
  description: "",
  itemList: [],
  ingredientList: []
};

const initialState: State = {
  activeShoppingList: activeShoppingList,
  saveModalIsOpen: false
};

@inject("shoppingListStore")
@inject("viewStore")
@inject("recipesStore")
@observer
export class ShoppingListForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { ...initialState };
    let recipeId = props.match.params.id;

    let shoppingListId = props.match.params.id;
    if (shoppingListId) {
      this.props.shoppingListStore.loadActiveShoppingList(
        shoppingListId,
        this.loadShoppingList.bind(this)
      );
    }

    if (recipeId) {
      if (props.location.pathname.includes("addRecipe"))
        this.props.recipesStore.loadActiveRecipe(
          recipeId,
          this.loadRecipe.bind(this)
        );
      else
        this.props.shoppingListStore.loadActiveShoppingList(
          recipeId,
          this.loadShoppingList.bind(this)
        );
    }
  }
  private loadShoppingList(shoppingList: ShoppingListViewModel): void {
    this.setState({
      activeShoppingList: shoppingList
    });
  }

  private loadRecipe(recipe: RecipeViewModel): void {
    let items: ItemListViewModel[] = [];
    recipe.ingredients.map(ingredient => {
      items.push(
        new ItemListViewModel(
          ingredient.name,
          ingredient.quantity,
          ingredient.quantityType
        )
      );
    });

    this.setState({
      activeShoppingList: {
        name: recipe.name + " ingredients",
        description: recipe.summary,
        itemList: items,
        id: 0,
        ingredientList: []
      }
    });
  }

  componentWillMount() {
    this.props.viewStore.changeActiveShoppingListTab(ShoppingListTabs.add);
  }

  componentDidMount() {
    this.resetShoppingList();
  }

  private handleSubmit(callback?: Function) {
    this.props.shoppingListStore.addShoppingList(
      this.state.activeShoppingList,
      callback
    );
    this.resetShoppingList();
    this.resetModal();
  }

  private resetModal() {
    this.setState({ saveModalIsOpen: true });
  }

  private resetShoppingList() {
    this.setState(initialState);
    this.setState({
      activeShoppingList: {
        ...this.state.activeShoppingList,
        notes: []
      }
    });
  }

  private handleTitleChange(name: string) {
    this.setState({
      activeShoppingList: { ...this.state.activeShoppingList, name: name }
    });
  }

  private handleDescriptionChange(description: string) {
    this.setState({
      activeShoppingList: {
        ...this.state.activeShoppingList,
        description: description
      }
    });
  }

  private handleCancel() {
    window.location.href = "/shoppingList/all";
  }

  private handleNotesError(isError: boolean) {
    let notesTab = document.getElementById(
      "bp3-tab-title_ShoppingListFormTabs_NotesTab"
    );

    if (notesTab) {
      if (isError) {
        notesTab.classList.replace(
          "shopping-list-tab",
          "shopping-list-tab-error"
        );
      } else {
        notesTab.classList.replace(
          "shopping-list-tab-error",
          "shopping-list-tab"
        );
      }
    }
  }

  private handleItemsChange(items: ItemListViewModel[]) {
    this.state.activeShoppingList.itemList = items;
  }

  private handleSavedBtnPressed(): void {
    let ingredientsError = false;
    let detailsError = false;
    let mediaError = false;

    if (this.state.activeShoppingList.itemList.length === 0) {
      this.handleIngredientsError(true);
      ingredientsError = true;
    } else {
      this.handleIngredientsError(false);
    }

    if (this.state.activeShoppingList.name === "") {
      this.handleDetailsError(true);
      detailsError = true;
    } else {
      this.handleDetailsError(false);
    }

    if (ingredientsError || detailsError) {
      return;
    }

    if (this.state.saveModalIsOpen) {
    } else {
      this.setState({ saveModalIsOpen: true });
    }
  }

  private handleModalSave(): void {
    this.setState({ saveModalIsOpen: false });
  }

  private handleDetailsError(isError: boolean) {
    let stepsTab = document.getElementById(
      "bp3-tab-title_ShoppingListFormTabs_DetailsTab"
    );

    if (stepsTab) {
      if (isError) {
        stepsTab.classList.replace(
          "shopping-list-tab",
          "shopping-list-tab-error"
        );
      } else {
        stepsTab.classList.replace(
          "shopping-list-tab-error",
          "shopping-list-tab"
        );
      }
    }
  }

  private handleIngredientsError(isError: boolean) {
    let ingredientsTab = document.getElementById(
      "bp3-tab-title_ShoppingListFormTabs_ItemsTab"
    );
    if (ingredientsTab) {
      if (isError) {
        ingredientsTab.classList.replace(
          "shopping-list-tab",
          "shopping-list-tab-error"
        );
      } else {
        ingredientsTab.classList.replace(
          "shopping-list-tab-error",
          "shopping-list-tab"
        );
      }
    }
  }

  render() {
    return (
      <div className="add-edit-shopping-list">
        <form className="shopping-list-form">
          <Tabs id="ShoppingListFormTabs">
            <Tab
              id="DetailsTab"
              title={
                <div>
                  Details
                  <Icon icon="error" />
                </div>
              }
              className="shopping-list-tab"
              panel={
                <ShoppingListDetails
                  shoppingList={this.state.activeShoppingList}
                  handleTitleChange={this.handleTitleChange.bind(this)}
                  handleDescriptionChange={this.handleDescriptionChange.bind(
                    this
                  )}
                />
              }
            />

            <Tab
              id="ItemsTab"
              title={
                <div>
                  Products
                  <Icon icon="error" />
                </div>
              }
              className="shopping-list-tab"
              panel={
                <ShoppingListItems
                  items={this.state.activeShoppingList.itemList}
                  handleItemsChange={this.handleItemsChange.bind(this)}
                />
              }
            />
          </Tabs>
          <div className="submit-button">
            <Button
              className="bp3-button bp3-active cancel-shopping-list"
              onClick={this.handleCancel.bind(this)}
            >
              Cancel
            </Button>
            <React.Fragment>
              <button
                type="button"
                className="bp3-button bp3-intent-primary save-shopping-list"
                onClick={this.handleSavedBtnPressed.bind(this)}
              >
                Save
              </button>
              <ShoppingListSaveModal
                open={this.state.saveModalIsOpen}
                handleSubmit={this.handleSubmit.bind(this)}
                onModalClose={this.handleModalSave.bind(this)}
                shoppingListStore={this.props.shoppingListStore}
              />
            </React.Fragment>
          </div>
        </form>
      </div>
    );
  }
}
