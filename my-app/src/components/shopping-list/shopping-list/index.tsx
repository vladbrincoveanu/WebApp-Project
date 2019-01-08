import { Route } from "react-router";
import * as React from "react";
import { ShoppingList } from "./ShoppingList";

export default () => {
  return (
    <React.Fragment>
      <Route path="/admin/shoppingList/all" component={ShoppingList} />
    </React.Fragment>
  );
};
