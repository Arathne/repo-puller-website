import React, {useState, useEffect} from 'react';
import Cube from './Cube.js';
import Slider from 'react-slick';


//import {NavLink} from 'react-router-dom';
function Nav() {
  const [slideAmount, setSlideAmount] = useState(Math.floor(window.innerWidth/300));
  const MIN_SIZE = 550;

  function handleResize() {
    const newSlideAmount = Math.floor(window.innerWidth/300);
    if( newSlideAmount !== slideAmount )
      setSlideAmount(newSlideAmount);

    if( window.innerHeight >= MIN_SIZE ) {
      document.documentElement.style.setProperty('--cube-size', `${110*(window.innerHeight/1080)}px` );
      document.documentElement.style.setProperty('--cube-padding-vertical', `${60*(window.innerHeight/1080)}px` );
    }

    document.documentElement.style.setProperty('--nav-slider-width', `${slideAmount*300}px` );

    const margin = ((window.innerWidth - (slideAmount+1)*220)/(slideAmount+1))/2;
    if( margin >= 0 )
      document.documentElement.style.setProperty('--cube-margin-horizontal', `${margin}px` );
  }

  useEffect( () => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if( window.innerHeight >= MIN_SIZE ) {
      document.documentElement.style.setProperty('--cube-size', `${110*(window.innerHeight/1080)}px` );
      document.documentElement.style.setProperty('--cube-padding-vertical', `${60*(window.innerHeight/1080)}px` );
    }
    else {
      document.documentElement.style.setProperty('--cube-size', `${110*(550/1080)}px` );
      document.documentElement.style.setProperty('--cube-padding-vertical', `${60*(550/1080)}px` );
    }
  })

  return (
    <div className='nav-root'>
      <Slider
        speed={500}
        centerMode={true}
        infinite={false}
        className='nav-slider'

        adjustHeight={true}
        arrows={false}
        slidesPerRow={slideAmount}
        centerPadding={0}
        dots={true}
        slidesToScroll={1}
      >
        <Cube />
        <Cube />
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </Slider>
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
