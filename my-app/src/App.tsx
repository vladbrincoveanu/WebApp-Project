import "./App.css";
import rootStore from "./store/root-store";
import { Provider } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserModel, UserCommandModel } from "./view-models/users";
import LoginRoute from "./components/login";
import RegisterRoute from "./components/register";
import * as React from "react";
import AdminRoute from "./components/admin";
import UserRoute from "./components/user";
import TabMenu from "./components/tab-menu/TabMenu";
import Welcome from "./components/welcome/Welcome";
import RecipeRoute from "./components/recipes/recipes-list";
import RecipeFormRoute from "./components/recipes/recipe-form";
import RecipesTabMenuRoute from "./components/recipes/recipes-tab-menu";
import SingleRecipeRoute from "./components/recipes/recipe-view";
import ShoppingListTabMenuRoute from "./components/shopping-list/shopping-list-tab-menu";
import ShoppingListFormRoute from "./components/shopping-list/shopping-list-form";
import ShoppingListRoute from "./components/shopping-list/shopping-list";
import ShoppingListViewRoute from "./components/shopping-list/shopping-list-view";
import { Login } from "./components/login/Login";

interface State {
  logged: any;
  clickLogged: boolean;
  registered: boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { logged: "", clickLogged: false, registered: false };
  }

  renderWelcomeUser = () => {
    const userJson = localStorage.getItem("user");
    let user: any;
    if (userJson !== null && userJson != "") {
      user = JSON.parse(userJson);
      const currentUser = new UserCommandModel(
        null,
        user.userName,
        user.mail,
        user.passwordHash
      );
      return "Buna ziua " + currentUser.userName;
    } else {
      return "Nothing!";
    }
  };

  updateState = () => {
    if (localStorage.getItem("logged") == null) {
      localStorage.setItem("logged", "");
      localStorage.setItem("user", "");
    }

    if (this.state.logged !== localStorage.getItem("logged")) {
      this.setState({
        logged: localStorage.getItem("logged")
      });
    }
  };

  Logged = () => {
    this.setState({
      logged: localStorage.getItem("logged")
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to shopping store</h1>
          <Provider {...rootStore}>
            <React.Fragment>
              <Router>
                {localStorage.getItem("user") != "" ? (
                  <React.Fragment>
                    <TabMenu viewStore={rootStore.viewStore} />
                    <Welcome
                      renderWelcomeUser={this.renderWelcomeUser}
                      updateState={this.updateState}
                      userStore={rootStore.userStore}
                    />
                    <AdminRoute />
                    <UserRoute />
                    <RecipesTabMenuRoute />
                    <RecipeRoute />
                    <SingleRecipeRoute />
                    <RecipeFormRoute />
                    <ShoppingListTabMenuRoute />
                    <ShoppingListRoute />
                    <ShoppingListFormRoute />
                    <ShoppingListViewRoute />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <LoginRoute />
                    <RegisterRoute />
                    {this.updateState()}
                  </React.Fragment>
                )}
              </Router>
            </React.Fragment>
          </Provider>
        </header>
      </div>
    );
  }
}

export default App;
