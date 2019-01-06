import * as React from "react";
import { observer } from "mobx-react";
import "../../shared/shared-css/list-all.css";
import { RecipeViewModel } from "../../../view-models/recipe";
import { RecipeListItem } from "../recipe-list-item/RecipeListItem";
import { Redirect } from "react-router-dom";
import Spinner from "../../shared/spinner/Spinner";

interface Props {
  recipes: RecipeViewModel[];
  handleSetFavorites: Function;
  waitingForData: boolean;
  recipesToOmit: number[];
}

@observer
export class RecipeListView extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  private recipeShouldBeOmittedAtRender(recipe) {
    return this.props.recipesToOmit.find(id => recipe.id == id);
  }

  render() {
    return (
      <React.Fragment>
        <div className="list-items">
          <Spinner waitingForData={this.props.waitingForData} />
          {this.props.recipes
            .filter(recipe => !this.recipeShouldBeOmittedAtRender(recipe))
            .map((recipe, index) => {
              return (
                <div key={index}>
                  <RecipeListItem
                    handleSetFavorites={this.props.handleSetFavorites}
                    recipe={recipe}
                    waitingForData={this.props.waitingForData}
                  />
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
