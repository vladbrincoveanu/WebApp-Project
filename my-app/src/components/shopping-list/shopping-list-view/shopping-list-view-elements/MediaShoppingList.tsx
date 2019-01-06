import * as React from "react";
import "../shopping-list-view.css";

interface Props {
  src?: string;
  handleOpenImage: Function;
}

export class MediaShoppingList extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private handleOpenImage = () => this.props.handleOpenImage();

  render() {
    return (
      <img
        onClick={this.handleOpenImage}
        className="image-ShoppingList"
        src={"/Images/" + this.props.src}
      />
    );
  }
}
