import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/global.css';

//Import pages (to be created in Step 3)
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;