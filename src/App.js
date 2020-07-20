import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Nav from './components/Nav.js';
import Terminal from './components/Terminal.js';

import Home from './pages/Home.js';
import Students from './pages/Students.js';

import './css/App.css';
import './css/Pages.css';
import './css/Components.css';
import './css/Cube.scss';


/*  renders basic layout of page and routes to the corresponding urls
*/
function App() {
  return (
    <Router>
      <div className='app'>
        <Nav />
        <div className='app-nav-trim'></div>
        <div className='app-content'>
          <Terminal />
          <div className='app-content-page'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/students' exact component={Students} />
            </Switch>
          </div>
        </div>
        <div className='scanlines'></div>
      </div>
    </Router>
  );
}

export default App;
