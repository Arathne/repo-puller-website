import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Nav from './components/Nav.js';
import Home from './pages/Home.js';

import './css/App.css';
import './css/Components.css';
import './css/Cube.scss';

function App() {
  return (
    <Router>
      <div className='app'>
        <Nav />
        <div className='app-nav-trim'></div>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
