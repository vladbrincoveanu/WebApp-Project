import { Route } from "react-router";
import * as React from "react";
import { RecipeForm } from "./RecipeForm";

export default () => {
  return (
    <React.Fragment>
      <Route path="/user/recipes/add" component={RecipeForm} />
      <Route path="/admin/recipes/add" component={RecipeForm} />
      <Route path="/admin/recipes/edit/:id" component={RecipeForm} />
    </React.Fragment>
  );
};
