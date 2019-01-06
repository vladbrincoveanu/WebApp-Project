import { Route } from "react-router";
import * as React from "react";
import { ShoppingListView } from "./ShoppingListView";

export default () => {
  return (
    <Route
      path="/ShoppingList/GetShoppingListById/:id"
      component={ShoppingListView}
    />
  );
};
