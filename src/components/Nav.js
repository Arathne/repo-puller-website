import React from 'react';
import Cube from './Cube.js';
//import {NavLink} from 'react-router-dom';

function Nav() {
  return (
    <div className='nav-root'>
      <Cube />
      <Cube />
    </div>
  );
}

/* <nav>
  <ul className='nav-root'>
    <li> <NavLink to='/' activeClassName='nav-active' exact> Home </NavLink> </li>
    <li> <NavLink to='/grand-exchange'  activeClassName='nav-active' exact> Grand Exchange </NavLink> </li>
    <li> <NavLink to='/trend' activeClassName='nav-active' exact> Trend </NavLink> </li>
  </ul>
</nav> */

export default Nav;
