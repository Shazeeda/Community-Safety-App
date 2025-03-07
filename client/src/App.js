import React from 'react';
import Header from './components/Header';
import IncidentList from './components/IncidentList';
import SubmitIncident from './components/SubmitIncident';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Header /> 
        <main>
          <Switch>
            <Route path="/" exact>
              <IncidentList /> 
            </Route>
            <Route path="/report">
              <SubmitIncident /> 
            </Route>
            <Route path="/login">
              <Login /> 
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
