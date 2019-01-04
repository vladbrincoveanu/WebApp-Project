import * as React from "react";
import { Icon } from "../../../node_modules/@blueprintjs/core";
import { Button } from "@blueprintjs/core";
import "./register.css";
import { Link } from "react-router-dom";
import { UserModel, UserCommandModel } from "../../view-models/users";
import { observer, inject } from "../../../node_modules/mobx-react";
import { UserStore } from "../../store/user-store";
import Bg from "../../images/da.png";

interface Props {
  userStore: UserStore;
}

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  requiredFirstName: boolean;
  requiredLastName: boolean;
  requiredEmail: boolean;
  requiredPassword: boolean;
  requiredPasswordRepeat: boolean;
  passwordRep: boolean;
  emailValid: boolean;
  passwordStrength: boolean;
}

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const initUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordRepeat: "",
  requiredFirstName: false,
  requiredLastName: false,
  requiredEmail: false,
  requiredPassword: false,
  requiredPasswordRepeat: false,
  passwordRep: false,
  emailValid: false,
  passwordStrength: false
};

@inject("userStore")
@observer
export class Register extends React.Component<Props, State> {
  private emailValidation = false;
  private emailInput: any;
  private firstNameInput: any;
  private lastNameInput: any;
  private passwordInput: any;
  private passwordRepeatInput: any;

  constructor(props: Props) {
    super(props);
    this.state = initUser;
  }

  private handleSubmit(): boolean {
    if (this.fieldValidations() == false) return false;
    let userToBeAdded = new UserCommandModel(
      null,
      this.state.firstName,
      this.state.email,
      this.state.password
    );
    this.props.userStore.addUser(userToBeAdded);
    return true;
  }

  private handleFirstNameChange(e: any): void {
    this.setState({ firstName: e.target.value });
  }

  private handleEmailChange(e: any): void {
    this.emailValidation = regexEmail.test(
      String(e.target.value).toLowerCase()
    );

    if (this.emailValidation) {
      this.emailInput.classList.replace("invalid", "valid");
    } else {
      this.emailInput.classList.replace("valid", "invalid");
    }
    this.setState({ email: e.target.value });
  }

  private handlePasswordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  private handlePaswordRepeatChange(e: any) {
    this.setState({ passwordRepeat: e.target.value });
  }

  private errorMessage(error: string) {
    return error !== "" ? (
      <div className="error-register ">
        <Icon icon="delete" />
        <span className="error-message">{error}</span>
      </div>
    ) : null;
  }

  private fieldValidations(): boolean {
    let requiredFirstName = false;
    let requiredLastName = false;
    let requiredEmail = false;
    let requiredPasswordRepeat = false;
    let requiredPassword = false;
    let passwordRep = false;
    let emailValid = false;
    let passwordStrength = false;

    if (this.state.firstName == "") {
      this.firstNameInput.classList.replace("valid", "invalid");
      requiredFirstName = true;
    } else {
      this.firstNameInput.classList.replace("invalid", "valid");
    }
    if (this.state.email == "") {
      this.emailInput.classList.replace("valid", "invalid");
      requiredEmail = true;
    } else {
      this.emailInput.classList.replace("invalid", "valid");
    }
    if (this.state.password == "") {
      this.passwordInput.classList.replace("valid", "invalid");
      requiredPassword = true;
    } else {
      this.passwordInput.classList.replace("invalid", "valid");
    }
    if (this.state.passwordRepeat == "") {
      this.passwordRepeatInput.classList.replace("valid", "invalid");
      requiredPasswordRepeat = true;
    } else {
      this.passwordRepeatInput.classList.replace("invalid", "valid");
    }
    if (this.state.passwordRepeat != this.state.password) {
      passwordRep = true;
    }

    let emailValidation = regexEmail.test(
      String(this.state.email).toLowerCase()
    );
    if (!emailValidation && this.state.email != "") {
      emailValid = true;
    }

    let passwordValidation = passswordRegex.test(String(this.state.password));
    if (!passwordValidation) {
      passwordStrength = true;
    }

    this.setState({
      requiredFirstName,
      requiredEmail,
      requiredPassword,
      requiredPasswordRepeat,
      passwordRep,
      emailValid,
      passwordStrength
    });

    if (
      requiredFirstName == true ||
      requiredPassword == true ||
      requiredPasswordRepeat == true ||
      requiredEmail == true ||
      passwordRep == true ||
      emailValid == true ||
      passwordStrength
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <img className="background-image" src={Bg} alt="no img" />
        <form>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              defaultValue=""
              placeholder="Enter name"
              ref={ref => {
                this.firstNameInput = ref;
              }}
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              onChange={this.handleFirstNameChange.bind(this)}
            />
            <span id="emailHelp" className="form-text">
              {this.state.requiredFirstName ? (
                this.errorMessage("This field is required")
              ) : (
                <div />
              )}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="Email">Email *</label>
            <input
              ref={ref => {
                this.emailInput = ref;
              }}
              className="form-control"
              id="Email"
              defaultValue=""
              placeholder="Enter your email"
              onChange={this.handleEmailChange.bind(this)}
            />
            <span id="emailHelp" className="form-text">
              {this.state.requiredEmail ? (
                this.errorMessage("This field is required")
              ) : (
                <div />
              )}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="pass">Password *</label>
            <input
              className="form-control"
              id="pass"
              ref={ref => {
                this.passwordInput = ref;
              }}
              defaultValue=""
              type="password"
              placeholder="Enter your password"
              onChange={this.handlePasswordChange.bind(this)}
            />
            <span id="emailHelp" className="form-text">
              {this.state.requiredPassword ? (
                this.errorMessage("This field is required")
              ) : (
                <div />
              )}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="repetpass">Repeat Password *</label>
            <input
              className="form-control"
              id="repetpass"
              ref={ref => {
                this.passwordRepeatInput = ref;
              }}
              defaultValue=""
              type="password"
              placeholder="Repeat your password"
              onChange={this.handlePaswordRepeatChange.bind(this)}
            />
            <span id="emailHelp" className="form-text">
              {this.state.requiredPasswordRepeat ? (
                this.errorMessage("This field is required")
              ) : (
                <div />
              )}
            </span>
            <span id="emailHelp" className="form-text">
              {this.state.passwordRep ? (
                this.errorMessage("Repeated password doesn't match password")
              ) : (
                <div />
              )}
            </span>
            <span id="emailHelp" className="form-text">
              {this.state.passwordStrength ? (
                this.errorMessage(
                  "Password must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 nr char and 1 special char"
                )
              ) : (
                <div />
              )}
            </span>
          </div>
        </form>

        <div className="row spaceRows">
          <div className="column">
            <Link style={{ float: "right" }} to="/user/login">
              <Button className="cancel-color">Cancel</Button>
            </Link>
          </div>
          <div className="column">
            <Button
              style={{ float: "left" }}
              className="register-color"
              onClick={() => {
                let checkUser = this.handleSubmit();
                if (checkUser) {
                  window.location.href = "/user/login";
                }
                return null;
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
