import React from 'react';
import './App.css';
import { Switch, } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { AuthContextProvider } from './context/auth';

import GardRoute from './components/GuardRoute';
import Root from './components/Root';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <AuthContextProvider>
        <div>
          <Root>
            <Switch>
              <GardRoute type="public" exact path="/login" component={LoginPage} />
              <GardRoute type="private" exact path="/" component={HomePage} />
            </Switch>
          </Root>
        </div>
      </AuthContextProvider>
    </ConnectedRouter>
  );
}


export default App;