import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "./../shopping-list-view.css";

class Icons extends React.Component<{}> {
  render() {
    return (
      <div>
        <Icon icon="edit" className="icon" iconSize={30} />
        <Icon icon="shopping-cart" className="icon" iconSize={30} />
        <Icon icon="heart" className="icon" iconSize={30} />
      </div>
    );
  }
}

export default Icons;
