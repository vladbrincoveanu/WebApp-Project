import { Route } from "react-router-dom";
import * as React from "react";
import { Register } from "../register/Register";

export default () => {
  return (
    <div>
      <Route exact path="/register" component={Register} />
    </div>
  );
};
