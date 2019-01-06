import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "./my-icon.css";

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
    return this.props.src ? (
      <img
        src={this.props.src}
        className={this.props.className}
        onClick={() => this.props.onClick && this.props.onClick()}
      />
    ) : (
      <Icon
        icon="media"
        className={this.props.className}
        onClick={() => this.props.onClick && this.props.onClick()}
      />
    );
  }
}

export default MyIcon;
