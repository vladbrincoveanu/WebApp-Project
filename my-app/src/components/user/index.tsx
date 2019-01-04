import { Route } from "react-router-dom";
import * as React from "react";
import { User } from "./User";

export default () => {
  return (
    <div>
      <Route exact path="/user" component={User} />
    </div>
  );
};
