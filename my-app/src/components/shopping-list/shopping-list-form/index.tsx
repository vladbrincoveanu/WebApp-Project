import { Route } from "react-router";
import * as React from "react";
import { ShoppingListForm } from "./ShoppingListForm";

export default () => {
  return (
    <React.Fragment>
      <Route path="/admin/shoppingList/add" component={ShoppingListForm} />
      <Route path="/admin/shoppingList/edit/:id" component={ShoppingListForm} />
      <Route
        path="/user/shoppingList/addRecipe/:id"
        component={ShoppingListForm}
      />
      <Route
        path="/admin/shoppingList/addRecipe/:id"
        component={ShoppingListForm}
      />
    </React.Fragment>
  );
};
