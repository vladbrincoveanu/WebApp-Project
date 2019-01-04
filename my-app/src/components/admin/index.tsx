import { Route } from "react-router-dom";
import * as React from "react";
import { Admin } from "./Admin";

export default () => {
  return (
    <div>
      <Route exact path="/" component={Admin} />
    </div>
  );
};
