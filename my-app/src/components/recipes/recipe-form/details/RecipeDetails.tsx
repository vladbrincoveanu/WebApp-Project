import * as React from "react";
import "./recipe-details.css";
import { RecipeViewModel } from "../../../../view-models/recipe";
import {
  NumericInput,
  Checkbox,
  TextArea,
  Slider,
  Icon
} from "@blueprintjs/core";
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-responsive-modal";
import { Item } from "../../../../../node_modules/@types/react-bootstrap/lib/Pagination";

interface Props {
  recipe: RecipeViewModel;
  handleRecipeDetailsNameChange: Function;
  handleRecipeDetailsSummaryChange: Function;
  handleRatingDetails: Function;
  savePressed: boolean;
}
interface State {
  rating: number;
  open: any;
  listcheckboxes: any;
  listmodalcheckboxes: any;
  sliderValue?: any;
}
const initialState = {
  rating: 0,
  sliderValue: 0,
  open: false,
  listcheckboxes: [],
  listmodalcheckboxes: []
};

export class RecipeDetails extends React.Component<Props, State> {
  private nameRef: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    this.functie();
    if (this.props.recipe.id && prevProps.recipe !== this.props.recipe) {
      this.changeValuesForEditedRecipe();
    }
  }

  componentWillpdate() {
    this.functie();
  }

  private functie(): void {
    if (this.props.savePressed && this.nameRef.value === "") {
      this.nameRef.classList.replace("valid", "invalid");
    } else {
      this.nameRef.classList.replace("invalid", "valid");
    }
  }

  private changeValuesForEditedRecipe() {
    this.setState({
      ...this.state,
      rating: this.getRating(this.props.recipe.rating)
    });
  }

  private getRating(rating: number) {
    return rating;
  }

  private handleRecipeDetailsNameChange(event: any) {
    this.props.handleRecipeDetailsNameChange(event.target.value);
  }

  private handleRecipeDetailsSummaryChange(event: any) {
    this.props.handleRecipeDetailsSummaryChange(event.target.value);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue }, () => {
      this.props.handleRatingDetails(this.state.rating);
    });
  }

  onOpenModal = () => {
    let listmodalcheckboxes = this.state.listmodalcheckboxes;
    for (let i = 0; i < listmodalcheckboxes.length; i++) {
      for (let j = 0; j < this.state.listcheckboxes.length; j++) {
        if (
          listmodalcheckboxes[i].content ===
          this.state.listcheckboxes[j].content
        ) {
          listmodalcheckboxes[i].checked = true;
        }
      }
    }
    this.setState({ open: true, listmodalcheckboxes: listmodalcheckboxes });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  takeTag(e) {
    let listmodalcheckboxesTemp = this.state.listmodalcheckboxes;
    for (let j = 0; j < listmodalcheckboxesTemp.length; j++) {
      if (listmodalcheckboxesTemp[j].content === e.target.value) {
        listmodalcheckboxesTemp[j].checked = !listmodalcheckboxesTemp[j]
          .checked;
      }
    }

    this.setState({ listmodalcheckboxes: listmodalcheckboxesTemp });
  }

  render() {
    return (
      <div>
        <div className="bp3-form-group bp3-inline recipe-details">
          <label className="bp3-label">Name*</label>
          <input
            className="bp3-input recipe recipe-title valid"
            value={this.props.recipe.name}
            type="text"
            name="title"
            ref={ref => {
              this.nameRef = ref;
            }}
            onChange={this.handleRecipeDetailsNameChange.bind(this)}
          />
        </div>
        <div className="bp3-form-group bp3-inline recipe-details">
          <label className="bp3-label">Summary*</label>
          <TextArea
            className="recipe-summary valid"
            large={true}
            value={this.props.recipe.summary}
            onChange={this.handleRecipeDetailsSummaryChange.bind(this)}
          />
        </div>
        <div>
          <div className="bp3-form-group bp3-inline recipe-details">
            <label className="bp3-label">Rating</label>
            <div className="ratingBar">
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.rating}
                starColor="#46b8da"
                emptyStarColor="#D6D6D6"
                renderStarIcon={() => <span className="heart" />}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
