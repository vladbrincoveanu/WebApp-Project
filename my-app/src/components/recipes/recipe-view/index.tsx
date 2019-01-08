import { Route } from "react-router";
import * as React from "react";
import { RecipeView } from "./RecipeView";

export default () => {
  return (
    <React.Fragment>
      <Route path="/admin/recipe/:id" component={RecipeView} />
      <Route path="/user/recipe/:id" component={RecipeView} />
    </React.Fragment>
  );
};
