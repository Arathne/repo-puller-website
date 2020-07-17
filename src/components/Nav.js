import React from 'react';
import Cube from './Cube.js';
//import {NavLink} from 'react-router-dom';

function Nav() {
  console.log(`width: ${window.innerWidth}`);
  console.log(`height: ${window.innerHeight}`);
  console.log(`scale: ${window.innerHeight/1080}`);
  document.documentElement.style.setProperty('--cube-scale', `${window.innerHeight/1080}` );

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
