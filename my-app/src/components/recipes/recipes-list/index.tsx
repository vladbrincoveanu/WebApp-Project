import { Route } from "react-router";
import * as React from "react";
import { RecipesList } from "./RecipesList";

export default () => {
  return <Route path="/recipes/all" component={RecipesList} />;
};
