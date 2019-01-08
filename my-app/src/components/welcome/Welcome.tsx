import * as React from "react";
import {
  Button,
  Popover,
  Menu,
  MenuItem
} from "../../../node_modules/@blueprintjs/core";
import { UserCommandModel } from "../../view-models/users";
import { UserStore } from "../../store/user-store";
import "./welcome.css";
import { Redirect } from "react-router";
import { ReactNode } from "react";

interface Props {
  updateState: Function;
  renderWelcomeUser: Function;
  userStore: UserStore;
}

interface State {
  redirect: ReactNode;
}

const initialState: State = {
  redirect: undefined
};

class Welcome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private handleClickEvent(): any {
    localStorage.setItem("logged", "");
    this.props.updateState();
    localStorage.setItem("user", "");
    localStorage.setItem("logged", "");
    window.location.href = "/login";
  }

  render() {
    return this.state.redirect ? (
      this.state.redirect
    ) : (
      <React.Fragment>
        <Popover
          className="positioning "
          content={
            <Menu className="hoverMenu">
              <MenuItem
                text="Log out"
                icon="log-out"
                onClick={this.handleClickEvent.bind(this)}
              />
            </Menu>
          }
        >
          <Button
            icon="chevron-down"
            className="backColor"
            text={this.props.renderWelcomeUser()}
          />
        </Popover>
      </React.Fragment>
    );
  }
}

export default Welcome;
