import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import ForgotPassword from './Components/ForgotPassword';
import HomePage from './Components/HomePage';
import LandingPage from './Components/LandingPage';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import WithLoggedInUser from './Components/WithLoggedInUser';
import ResetPassword from './Components/ResetPassword';
import manage from './scripts/manageLoggedinUser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    }
  }

  componentDidMount() {
    manage((loggedInUser) => this.setState({ loggedInUser }));
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <WithLoggedInUser
              path="/"
              exact={true}
              isUserLoggedIn={!!this.state.loggedInUser}
              ifLoggedInPage={<Redirect to="/home" />}
              ifLoggedOutPage={<LandingPage />}
            />
            <WithLoggedInUser
              path="/login"
              isUserLoggedIn={!!this.state.loggedInUser}
              ifLoggedInPage={<Redirect to="/home" />}
              ifLoggedOutPage=
              {
                <LoginForm
                  populateLoggedInUser={(loggedInUser) => this.setState({ loggedInUser })}
                />
              }
            />
            <WithLoggedInUser
              path="/signup"
              isUserLoggedIn={!!this.state.loggedInUser}
              ifLoggedInPage={<Redirect to="/home" />}
              ifLoggedOutPage=
              {
                <SignupForm
                  populateLoggedInUser={(loggedInUser) => this.setState({ loggedInUser })}
                />
              }
            />
            <WithLoggedInUser
              path="/home"
              isUserLoggedIn={!!this.state.loggedInUser}
              ifLoggedInPage=
              {
                <HomePage
                  populateLoggedInUser={() => this.setState({ loggedInUser: null })}
                />
              }
              ifLoggedOutPage={<Redirect to="/" />}
            />
            <WithLoggedInUser
              path="/forgot-password"
              isUserLoggedIn={!!this.state.loggedInUser}
              ifLoggedInPage=
              {
                <HomePage
                  populateLoggedInUser={() => this.setState({ loggedInUser: null })}
                />
              }
              ifLoggedOutPage={<ForgotPassword />}
            />
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
