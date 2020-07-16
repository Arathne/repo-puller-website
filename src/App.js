import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//import Nav from './components/nav.js';
import Home from './pages/Home.js';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
