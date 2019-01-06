import * as React from "react";
import Modal from "react-responsive-modal";
import { RecipesStore } from "../../../store/recipe-store";
import { Icon, Spinner } from "@blueprintjs/core";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onModalClose: () => void;
  recipeId: number;
  recipesStore: RecipesStore;
}

interface State {
  responseHasArrived: boolean;
  requestHasBeenSent: boolean;
}

const initialState = {
  responseHasArrived: false,
  requestHasBeenSent: false
};

export class RecipeDeleteModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };
  }

  private deleteRecipe() {
    this.props.recipesStore.deleteRecipe(this.props.recipeId, () => {
      this.setState({ responseHasArrived: true });
    });
    this.setState({ requestHasBeenSent: true });
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={() =>
          !this.state.requestHasBeenSent && this.props.onModalClose()
        }
        center
        showCloseIcon={!this.state.requestHasBeenSent}
      >
        <div className="recipe-delete-modal-content">
          {!this.state.requestHasBeenSent && (
            <React.Fragment>
              <div className="confirmation-text">
                Are you sure you want to delete this recipe?
              </div>
              <div className="submit-button">
                <button
                  type="button"
                  onClick={this.props.onModalClose}
                  className="bp3-button bp3-intent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.deleteRecipe.bind(this)}
                  className="bp3-button bp3-intent-danger"
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          )}
          {this.state.requestHasBeenSent && !this.state.responseHasArrived && (
            <React.Fragment>
              <div>Deleting recipe...</div>
              <Spinner size={Spinner.SIZE_LARGE} />
            </React.Fragment>
          )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.recipesStore.statusCode == 200 && (
              <React.Fragment>
                <Icon icon="tick-circle" className="big-icon ok" />
                <span className="ok">The Recipe was successfully deleted</span>
                <div className="submit-button">
                  <Link
                    className="bp3-button bp3-intent-success"
                    to="/recipes/all"
                  >
                    Ok
                  </Link>
                </div>
              </React.Fragment>
            )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.recipesStore.statusCode == 500 && (
              <React.Fragment>
                <Icon icon="delete" className="big-icon err" />
                <span className="err">
                  A problem occurred during the current operation. The recipe
                  could not be deleted
                </span>
                <div className="submit-button">
                  <button
                    type="button"
                    onClick={this.props.onModalClose}
                    className="bp3-button bp3-intent"
                  >
                    Close
                  </button>
                </div>
              </React.Fragment>
            )}
        </div>
      </Modal>
    );
  }
}
