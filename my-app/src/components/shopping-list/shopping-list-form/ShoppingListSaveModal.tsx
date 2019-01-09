import * as React from "react";
import Modal from "react-responsive-modal";
import { Icon, Spinner } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { ShoppingListStore } from "../../../store/shopping-list-store";
import { debug } from "util";

interface ShoppingListSaveModelProps {
  open: boolean;
  onModalClose: () => void;
  handleSubmit: Function;
  shoppingListStore: ShoppingListStore;
}

interface ShoppingListSaveModelState {
  responseHasArrived: boolean;
  requestHasBeenSent: boolean;
}

const initialState = {
  responseHasArrived: false,
  requestHasBeenSent: false
};

export class ShoppingListModal extends React.Component<
  ShoppingListSaveModelProps,
  ShoppingListSaveModelState
> {
  constructor(props: ShoppingListSaveModelProps) {
    super(props);
    this.state = initialState;
  }

  private saveShoppingList(): void {
    this.props.handleSubmit(() => {
      this.setState({ responseHasArrived: true });
    });

    this.setState({ requestHasBeenSent: true });
  }

  private checkAdmin(data: string | undefined) {
    if (data == undefined) return "Error";
    console.log(data);
    if (data == "DA") {
      return "/admin";
    } else {
      return "/user";
    }
  }

  private linkGenerator(id: number) {
    localStorage.setItem("logged", "");
    var nullCheck = localStorage.getItem("user");
    if (nullCheck == null) {
    } else {
      var user: any = JSON.parse(nullCheck);
    }
    if (id == 1) {
      return this.checkAdmin(user.userName) + "/recipes/add";
    } else {
      return this.checkAdmin(user.userName) + "/shoppingList/all";
    }
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
                Are you sure you want to add this shopping list?
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
                  onClick={this.saveShoppingList.bind(this)}
                  className="bp3-button bp3-intent-success"
                >
                  Save
                </button>
              </div>
            </React.Fragment>
          )}
          {this.state.requestHasBeenSent && !this.state.responseHasArrived && (
            <React.Fragment>
              <div>Saving shopping list...</div>
              <Spinner size={Spinner.SIZE_LARGE} />
            </React.Fragment>
          )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.shoppingListStore.status == 200 && (
              <React.Fragment>
                <Icon icon="tick-circle" className="big-icon ok" />
                <span className="ok">
                  The Shopping List was successfully saved
                </span>
                <div className="submit-button">
                  <Link
                    className="bp3-button bp3-intent-success"
                    to={this.linkGenerator(2)}
                  >
                    Ok
                  </Link>
                </div>
              </React.Fragment>
            )}

          {this.state.requestHasBeenSent &&
            this.state.responseHasArrived &&
            this.props.shoppingListStore.status == 500 && (
              <React.Fragment>
                <Icon icon="delete" className="big-icon err" />
                <span className="err">
                  A problem occurred during the current operation. The shopping
                  list could not be saved
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

export default ShoppingListModal;
