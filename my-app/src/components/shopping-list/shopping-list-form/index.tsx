import { Route } from "react-router";
import * as React from "react";
import { ShoppingListForm } from "./ShoppingListForm";

export default () => {
  return (
    <React.Fragment>
      <Route path="/shoppingList/add" component={ShoppingListForm} />
      <Route path="/shoppingList/edit/:id" component={ShoppingListForm} />
      <Route path="/shoppingList/addRecipe/:id" component={ShoppingListForm} />
    </React.Fragment>
  );
};
