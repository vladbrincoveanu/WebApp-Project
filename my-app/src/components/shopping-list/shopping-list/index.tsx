import { Route } from "react-router";
import * as React from "react";
import { ShoppingList } from "./ShoppingList";

export default () => {
  return <Route path="/shoppingList/all" component={ShoppingList} />;
};
