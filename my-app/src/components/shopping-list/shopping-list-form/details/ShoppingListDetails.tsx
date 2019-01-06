import * as React from "react";
import "./shopping-list-details.css";
import { ShoppingListViewModel } from "../../../../view-models/shopping-list";
import { TextArea } from "@blueprintjs/core";
import { ReactTags } from "react-tag-input";
import { RecipeViewModel } from "../../../../view-models/recipe";
import shoppingList from "../../shopping-list";

interface Props {
  shoppingList: ShoppingListViewModel;
  handleTitleChange: Function;
  handleDescriptionChange: Function;
}

interface State {
  title: string;
  description: string;
  category: string;
  tags: string[];
  uploadedRawPhoto: string;
}

const initialState = {
  title: "",
  description: "",
  category: "",
  tags: [],
  uploadedRawPhoto: ""
};

export class ShoppingListDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.shoppingList.id &&
      previousProps.shoppingList !== this.props.shoppingList
    ) {
      this.changeValuesForEditedShoppingList();
    }
  }

  private changeValuesForEditedShoppingList() {
    this.setState({
      title: this.props.shoppingList.name,
      description: this.props.shoppingList.description
    });
  }

  private handleTitleChange(event: any) {
    this.props.handleTitleChange(event.target.value);
  }

  private handleDescriptionChange(event: any) {
    this.props.handleDescriptionChange(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="bp3-form-group bp3-inline shopping-list-details">
          <label className="bp3-label">Name*</label>
          <input
            className="bp3-input shopping-list-title"
            value={this.props.shoppingList.name}
            placeholder="Title"
            onChange={this.handleTitleChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline shopping-list-details">
          <label className="bp3-label">Description</label>
          <TextArea
            className="shopping-list-description"
            placeholder="Multi-line textarea"
            value={this.props.shoppingList.description}
            onChange={this.handleDescriptionChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
