import * as React from "react";
import "./tab-menu.css";
import { observer } from "mobx-react";
import * as classNames from "classnames";
import { Link, Redirect } from "react-router-dom";
import { HeaderTabs } from "../../view-models/header-tabs";
import { ViewStore } from "../../store/view-store";
import { Icon } from "../../../node_modules/@blueprintjs/core";
import { UserCommandModel } from "src/view-models/users";
import { LocationDescriptor } from "history";

interface Props {
  viewStore: ViewStore;
}

interface State {
  redirectTo: string;
}

@observer
class TabMenu extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    if (localStorage.getItem("user")) this.state = { redirectTo: "" };
  }

  private changeActiveTab(tab: HeaderTabs) {
    this.setState({ redirectTo: "" });
    this.props.viewStore.changeActiveHeaderTab(tab);
  }

  isActive(tab: HeaderTabs) {
    return this.props.viewStore.activeHeaderTab === tab;
  }

  handleEnter(searchString: any) {
    this.changeActiveTab(HeaderTabs.search);
    if (searchString == "") searchString = encodeURI(" ");
    this.setState({ redirectTo: "/searchResults/" + searchString });
  }

  private handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
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

  private linkGenerator(id: number): LocationDescriptor {
    localStorage.setItem("logged", "");
    var nullCheck = localStorage.getItem("user");
    if (nullCheck == null) {
    } else {
      var user: any = JSON.parse(nullCheck);
    }
    if (id == 3) {
      return this.checkAdmin(user.userName) + "/shoppingList/all";
    } else if (id == 2) {
      return this.checkAdmin(user.userName) + "/recipes/all";
    } else {
      return this.checkAdmin(user.userName) + "/home";
    }
  }

  public render() {
    return (
      <div>
        {this.handleRedirect()}
        <div className="header-tabs">
          <ul className="tabs">
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.home)
              })}
            >
              <Link
                to={this.linkGenerator(1)}
                onClick={() => this.changeActiveTab(HeaderTabs.home)}
              >
                <Icon className="icon-home" icon="home" />
                Home
              </Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.recipes)
              })}
            >
              <Link
                to={this.linkGenerator(2)}
                onClick={() => this.changeActiveTab(HeaderTabs.recipes)}
              >
                <Icon className="icon-ingredients-list" icon="annotation" />
                Recipes
              </Link>
            </li>
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.shoppingList)
              })}
            >
              <Link
                to={this.linkGenerator(3)}
                onClick={() => this.changeActiveTab(HeaderTabs.shoppingList)}
              >
                <Icon className="icon-shopping-cart" icon="shopping-cart" />
                Shopping List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TabMenu;
