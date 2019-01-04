import "./App.css";
import rootStore from "./store/root-store";
import { Provider } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "./logo.svg";
import { UserModel, UserCommandModel } from "./view-models/users";
import LoginRoute from "./components/login";
// import HomeRoute from "./components/home";
import RegisterRoute from "./components/register";
import * as React from "react";
import AdminRoute from "./components/admin";
import UserRoute from "./components/user";

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
    if (userJson != null) {
      user = JSON.parse(userJson);
    }
    const currentUser = new UserCommandModel(
      null,
      user.name,
      user.mail,
      user.passwordhash
    );
    return "Serus" + currentUser.userName;
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <Provider {...rootStore}>
            <React.Fragment>
              <Router>
                <React.Fragment>
                  <LoginRoute />
                  <RegisterRoute />
                  <AdminRoute />
                  <UserRoute />
                  {/* <TabMenu/> */}
                  {/* <Welcome
                    renderWelcomeUser= this.renderWelcomeUser()
                  /> */}
                </React.Fragment>
              </Router>
            </React.Fragment>
          </Provider>
        </header>
      </div>
    );
  }
}

export default App;
