import React, { useEffect, useState } from 'react';
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
import ResetPassword from './Pages/ResetPassword';
import manage from './scripts/manageLoggedinUser';
import AfterPasswordReset from './Pages/AfterPasswordReset';
import AfterForgotPassword from './Pages/AfterForgotPassword';
import Users from './Pages/Users';
import AfterUserSignUp from './Pages/AfterUserSignUp';
import NewOrder2 from './Pages/NewOrder2';
import Clients from './Pages/Clients';
import Items from './Pages/Items';
import Orders from './Pages/Orders';
import 'normalize.css';
import './styles/style.scss';
import UserContext from './UserContext';
import Map from './Components/test'
import DeliveryMap from './Pages/DeliveryMap';
import OrderDetails from './Pages/OrderDetails';
import Messages from './Pages/Messages';
import Statistics from './Pages/Statistics';
const axios = require('axios');


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    manage(loggedInUser, (loggedInUser) => setLoggedInUser(loggedInUser));
  }, []);

  useEffect(() => {
    try {
      const script = document.createElement('script');
      script.src = 'http://localhost:9000/static/domSniffer.js';
      script.async = true;

      document.body.appendChild(script)

    }
    catch (e) {
      console.log(e);
    }
  })


  const renderSwitch = () => {
    return (
      loggedInUser ?
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/signup">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/" />
          </Route>
          <Route exact path="/home">
            <HomePage
            />
          </Route>
          <Route exact path="/forgot-password">
            <HomePage
            />
          </Route>
          <Route exact path="/reset-password/:userEmail">
            <ResetPassword />
          </Route>
          <Route exact path="/password-updated">
            <AfterPasswordReset />
          </Route>
          <Route exact path="/reset-password-email-sent">
            <AfterForgotPassword />
          </Route>
          <Route exact path="/users">
            <Users
              manager={loggedInUser}
            />
          </Route>
          <Route exact path="/user-signup/:userData">
            <SignupForm
              isAccount={false}
            />
          </Route>
          <Route exact path="/user-signup-successful">
            <AfterUserSignUp />
          </Route>
          <Route exact path="/new-order">
            <NewOrder2 />
          </Route>,
          <Route exact path="/clients">
            <Clients />
          </Route>
          <Route exact path="/items">
            <Items />
          </Route>
          <Route exact path="/orders">
            <Orders />
          </Route>
          <Route exact path="/delivery-map">
            <DeliveryMap />
          </Route>
          <Route exact path="/order/:id">
            <OrderDetails />
          </Route>
          <Route exact path="/messages">
            <Messages />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
        </Switch>
        :
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/signup">
            <SignupForm
              isAccount={true}
            />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/" />
          </Route>
          <Route exact path="/home">
            <Redirect to="/" />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/reset-password/:userEmail">
            <ResetPassword />
          </Route>
          <Route exact path="/password-updated">
            <AfterPasswordReset />
          </Route>
          <Route exact path="/reset-password-email-sent">
            <AfterForgotPassword />
          </Route>
          <Route exact path="/users">
            <Redirect to="/" />
          </Route>
          <Route exact path="/user-signup/:userData">
            <SignupForm
              isAccount={false}
            />
          </Route>
          <Route exact path="/user-signup-successful">
            <AfterUserSignUp />
          </Route>
          <Route exact path="/new-order">
            <Redirect to="/" />
          </Route>
          <Route exact path="/clients">
            <Redirect to="/" />
          </Route>
          <Route exact path="/items">
            <Redirect to="/" />
          </Route>
          <Route exact path="/orders">
            <Redirect to="/" />
          </Route>
          <Route exact path="/delivery-map">
            <Redirect to="/" />
          </Route>
          <Route exact path="/order/:order-id">
            <Redirect to="/" />
          </Route>
          <Route exact path="/messages">
            <Redirect to="/" />
          </Route>
          <Route exact path="/statistics">
            <Redirect to="/" />
          </Route>
        </Switch>
    )
  }
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router >
        {renderSwitch()}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
