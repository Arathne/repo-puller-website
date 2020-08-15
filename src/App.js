import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Nav from './components/Nav.js';
import Terminal from './components/Terminal.js';

import Home from './pages/Home.js';
import Students from './pages/Students.js';
import Archive from './pages/Archive.js';
import Readme from './pages/Readme.js';
import LogIn from './pages/LogIn.js';

import './css/App.css';
import './css/Pages.css';
import './css/Students.css';
import './css/Components.css';
import './css/Archive.css';
import './css/Cube.scss';


/*  renders basic layout of page and routes to the corresponding urls
*/
function App() {
  const [loggedIn, setLoggedIn] = useState(false);


  /* re-renders once log in state has changed
  */
  const updateLoggedIn = (bool) => {
    setLoggedIn(bool);
  }


  /* show log in page or route to page requested
  */
  const LogInCheck = () => {
    if( loggedIn ) {
      return (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/students' exact component={Students} />
          <Route path='/archive' exact component={Archive} />
          <Route path='/readme' exact component={Readme} />
        </Switch>
      )
    }
    else
      return <LogIn showPage={updateLoggedIn} />
  }


  /* render
  */
  return (
    <Router>
      <div className='app'>
        <Nav />
        <div className='app-nav-trim'></div>
        <div className='app-content'>
          <Terminal />
          <div className='app-content-page'>
            { LogInCheck() }
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
