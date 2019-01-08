import { Route } from "react-router";
import * as React from "react";
import RecipesTabMenu from "./RecipesTabMenu";

export default () => {
  return (
    <React.Fragment>
      <Route path="/admin/recipes" component={RecipesTabMenu} />
      <Route path="/user/recipes" component={RecipesTabMenu} />
    </React.Fragment>
  );
};
