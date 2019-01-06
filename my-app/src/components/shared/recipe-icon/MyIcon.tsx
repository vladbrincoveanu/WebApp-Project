import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "./my-icon.css";
import { Sl } from "../../../images/shopping-list.png";

interface Props {
  onClick?: Function;
  src?: string;
  className?: string;
}

interface State {}

class MyIcon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <img
        src={Sl}
        alt="shopping image"
        className={this.props.className}
        onClick={() => this.props.onClick && this.props.onClick()}
      />
    );
    // return this.props.src ? (

    // ) : (
    //   <Icon
    //     icon="media"
    //     className={this.props.className}
    //     onClick={() => this.props.onClick && this.props.onClick()}
    //   />
    // );
  }
}

export default MyIcon;
