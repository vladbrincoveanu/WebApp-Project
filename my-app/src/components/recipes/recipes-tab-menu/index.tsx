import { Route } from "react-router";
import * as React from "react";
import RecipesTabMenu from "./RecipesTabMenu";

export default () => {
  return <Route path="/recipes" component={RecipesTabMenu} />;
};
