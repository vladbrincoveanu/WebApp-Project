import { Route } from "react-router";
import * as React from "react";
import { RecipesList } from "./RecipesList";

export default () => {
  return (
    <React.Fragment>
      <Route path="/user/recipes/all" component={RecipesList} />
      <Route path="/admin/recipes/all" component={RecipesList} />
    </React.Fragment>
  );
};
