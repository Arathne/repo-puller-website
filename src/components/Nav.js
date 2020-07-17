import React, {useEffect} from 'react';
import Cube from './Cube.js';
//import {NavLink} from 'react-router-dom';
function Nav() {
  const MIN_SIZE = 550;

  function handleResize() {
    if( window.innerHeight >= MIN_SIZE )
      document.documentElement.style.setProperty('--cube-scale', `${window.innerHeight/1080}` );
  }

  useEffect( () => {
    window.addEventListener('resize', handleResize);
  })

  handleResize();

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
