import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "./my-icon.css";
import { Sl } from "../../../images/shoppingimg.png";

interface Props {
  onClick?: Function;
  src?: string;
  className?: string;
}

interface State {
  imageLoadError: boolean;
  imageUrl: string;
}

class MyIcon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageLoadError: false,
      imageUrl: "../../../images/shoppingimg.png"
    };
  }

  render() {
    return (
      <Icon
        icon="media"
        className="resize"
        onClick={() => this.props.onClick && this.props.onClick()}
        onError={e => {
          if (this.state.imageLoadError) {
            this.setState({
              imageLoadError: false
            });
            this.setState({
              imageUrl: "media"
            });
          }
        }}
      />
      // <Icon
      //   icon="media"
      //   className={this.props.className}
      //   onClick={() => this.props.onClick && this.props.onClick()}
      // />
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
