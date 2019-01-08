import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "../../store/view-store";
import { Button, Icon, InputGroup, Tooltip } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import "./login.css";
import { UserModel, UserCommandModel } from "../../view-models/users";
import { UserStore } from "../../store/user-store";
import Bg from "../../images/da.png";

interface Props {
  userStore: UserStore;
  viewStore: ViewStore;
}

interface State {
  username: string;
  password: string;
  users: UserCommandModel[];
}

@inject("viewStore")
@inject("userStore")
@observer
export class Login extends React.Component<Props, State> {
  private mailButton = (
    <Tooltip content={"Email"}>
      <Icon icon={"envelope"} iconSize={50} className="position-icon" />
    </Tooltip>
  );
  private lockButton = (
    <Tooltip content={"Password"}>
      <Icon icon={"lock"} iconSize={50} className="position-icon-pass" />
    </Tooltip>
  );
  constructor(props: Props) {
    super(props);
    this.state = { username: "", password: "", users: [] };
    this.props.userStore.loadUsers(() => {
      this.setState({ users: this.props.userStore.users });
    });
  }

  private loadUser(): void {
    localStorage.setItem("user", JSON.stringify(this.props.userStore.user));
    localStorage.setItem("logged", JSON.stringify("logged"));
    if (this.props.userStore.user.userName == "DA") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/user";
    }
  }

  handleUserLogin = () => {
    // this.state.users.map(user => console.log(user));
    console.log("LOGIN");
    this.props.userStore.logIn(
      new UserCommandModel(null, this.state.username, "", this.state.password),
      this.loadUser.bind(this)
    );
  };

  private changeUsername(e: any): void {
    this.setState({ username: e.target.value });
  }

  private changePassword(e: any): void {
    this.setState({ password: e.target.value });
  }

  private errorMessage(error: string) {
    return error !== "" ? (
      <div className="error ">
        <Icon icon="delete" />
        <span className="error-message">{error}</span>
      </div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <img className="background-image" src={Bg} alt="no img" />
        <div className="divStyle">
          <InputGroup
            placeholder="Enter your username..."
            rightElement={this.mailButton}
            className="username font-size"
            onChange={this.changeUsername.bind(this)}
          />
        </div>
        <div>
          <InputGroup
            placeholder="Enter your password..."
            type={"password"}
            rightElement={this.lockButton}
            className="password font-size"
            onChange={this.changePassword.bind(this)}
          />
        </div>
        <div>
          <Button
            className="button-all"
            onClick={this.handleUserLogin.bind(this)}
          >
            Log In
          </Button>
        </div>
        <div>
          <Link to="/register">
            <Button className="button-all textDecoration">Register</Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
