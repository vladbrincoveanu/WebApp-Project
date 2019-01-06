import * as React from "react";
import "../recipe-view.css";
import { Icon } from "../../../../../node_modules/@blueprintjs/core";
import StarRatingComponent from "react-star-rating-component";
import { RecipeViewModel } from "../../../../view-models/recipe";

interface Props {
  activeRecipe: RecipeViewModel;
}

export class Details extends React.Component<Props> {
  render() {
    return (
      <div className="column border-section">
        <div className="bookmark-icon">
          <Icon color="#f25800" icon="bookmark" iconSize={50} />
        </div>
        <div className="section-content recipe-details">
          <div className="row">
            <div className="column">
              <StarRatingComponent
                name="rating"
                editing={true}
                starColor="#46b8da"
                renderStarIcon={() => <span className="heart" />}
                starCount={5}
                emptyStarColor="#D6D6D6"
                value={this.props.activeRecipe.rating}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="time-details" />
              <div className="details-summary">
                {this.props.activeRecipe.summary}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
