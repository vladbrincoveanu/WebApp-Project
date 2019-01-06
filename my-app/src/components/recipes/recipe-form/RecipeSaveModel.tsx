import * as React from "react";
import Modal from "react-responsive-modal";
import { RecipesStore } from "../../../store/recipe-store";
import { Icon, Spinner } from "@blueprintjs/core";
import { Link } from "react-router-dom";

interface RecipeSaveModelProps {
  open: boolean;
  onModalClose: () => void;
  handleSubmit: Function;
  recipesStore: RecipesStore;
}

interface RecipeSaveModelState {
  responseHasArrived: boolean;
  requestHasBeenSent: boolean;
}

const initialState = {
  responseHasArrived: false,
  requestHasBeenSent: false
};

export class RecipeSaveModel extends React.Component<
  RecipeSaveModelProps,
  RecipeSaveModelState
> {
  constructor(props: RecipeSaveModelProps) {
    super(props);
    this.state = { ...initialState };
  }

  private saveRecipe(): void {
    this.props.handleSubmit(() => {
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
                Are you sure you want to add this recipe?
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
                  onClick={this.saveRecipe.bind(this)}
                  className="bp3-button bp3-intent-success"
                >
                  Save
                </button>
              </div>
            </React.Fragment>
          )}
          {this.state.requestHasBeenSent && !this.state.responseHasArrived && (
            <React.Fragment>
              <div>Saving recipe...</div>
              <Spinner size={Spinner.SIZE_LARGE} />
            </React.Fragment>
          )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.recipesStore.statusCode == 200 && (
              <React.Fragment>
                <Icon icon="tick-circle" className="big-icon ok" />
                <span className="ok">The Recipe was successfully saved</span>
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
                  could not be saved
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

export default RecipeSaveModel;
