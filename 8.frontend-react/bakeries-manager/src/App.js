import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ForgotPassword from './Pages/ForgotPassword';
import HomePage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import LoginForm from './Pages/LoginForm';
import SignupForm from './Pages/SignupForm';
import WithLoggedInUser from './Components/WithLoggedInUser';
import ResetPassword from './Pages/ResetPassword';
import manage from './scripts/manageLoggedinUser';
import AfterPasswordReset from './Pages/AfterPasswordReset';
import AfterForgotPassword from './Pages/AfterForgotPassword';
import Users from './Pages/Users';
import AfterUserSignUp from './Pages/AfterUserSignUp';
import 'normalize.css';
import './styles/style.scss';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    }
    this.renderSwitch = this.renderSwitch.bind(this);
  }

  componentDidMount() {
    manage((loggedInUser) => this.setState({ loggedInUser }));
  }

  renderSwitch() {



    return (
      this.state.loggedInUser ?
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/login">
            <Redirect to="/home" />
          </Route>
          <Route path="/signup">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage
              handleLogoutMethod={() => this.setState({ loggedInUser: null })}
            />
          </Route>
          <Route path="/forgot-password">
            <HomePage
              handleLogoutMethod={() => this.setState({ loggedInUser: null })}
            />
          </Route>
          <Route path="/reset-password/:userEmail">
            <ResetPassword />
          </Route>
          <Route path="/password-updated">
            <AfterPasswordReset />
          </Route>
          <Route path="/reset-password-email-sent">
            <AfterForgotPassword />
          </Route>
          <Route path="/users">
            <Users
              manager={this.state.loggedInUser}
            />
          </Route>
          <Route path="/user-signup/:userData">
            <SignupForm
              isAccount={false}
            />
          </Route>
          <Route path="/user-signup-successful">
            <AfterUserSignUp />
          </Route>
        </Switch>
        :
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginForm
              populateLoggedInUser={(loggedInData) => this.setState({ loggedInUser: loggedInData })}
            />
          </Route>
          <Route path="/signup">
            <SignupForm
              populateLoggedInUser={(loggedInData) => this.setState({ loggedInUser: loggedInData })}
              isAccount={true}
            />
          </Route>
          <Route path="/home">
            <Redirect to="/" />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:userEmail">
            <ResetPassword />
          </Route>
          <Route path="/password-updated">
            <AfterPasswordReset />
          </Route>
          <Route path="/reset-password-email-sent">
            <AfterForgotPassword />
          </Route>
          <Route path="/users">
            <Redirect to="/" />
          </Route>
          <Route path="/user-signup/:userData">
            <SignupForm
              isAccount={false}
            />
          </Route>
          <Route path="/user-signup-successful">
            <AfterUserSignUp />
          </Route>
        </Switch>
    )
  }

  render() {
    return (
      <Router>

        {this.renderSwitch()}

      </Router>
    );
  }
}

export default App;
