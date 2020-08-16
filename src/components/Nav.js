/*  navigation bar that controls slider and creates instances of 3D cubes */

import React, {useState, useEffect} from 'react';
import Cube from './Cube.js';
import Slider from 'react-slick';
import {NavLink} from 'react-router-dom';

function Nav() {
  const [slideAmount, setSlideAmount] = useState(Math.floor(window.innerWidth/300));
  const MIN_SIZE = 550;


  /*  actions taken when window is resized
  */
  function handleResize() {
    const newSlideAmount = Math.floor(window.innerWidth/300);
    if( newSlideAmount !== slideAmount )
      setSlideAmount(newSlideAmount);

    if( window.innerHeight >= MIN_SIZE ) {
      document.documentElement.style.setProperty('--cube-size', `${110*(window.innerHeight/1080)}px` );
      document.documentElement.style.setProperty('--cube-padding-vertical', `${60*(window.innerHeight/1080)}px` );
    }
  }


  /* runs on start and sets up resize events
  */
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


  /*  render
  */
  return (
    <div className='nav-root'>
      {/* always on top navigation bar */}
      <Slider
        speed={500}
        centerMode={true}
        infinite={true}
        className='nav-slider fixed front'

        adjustHeight={true}
        arrows={true}
        slidesPerRow={slideAmount}
        centerPadding={0}
        dots={true}
        slidesToScroll={1}
      >
        <NavLink to='/' activeClassName='nav-active' exact> <Cube name='home' image='home.png' /> </NavLink>
        <NavLink to='/students' exact> <Cube name='students' image='students.png' /> </NavLink>
        <NavLink to='/archive' exact> <Cube name='archive' image='floppydisk.png' /> </NavLink>
        <NavLink to='/readme' exact> <Cube name='readme' image='readme.png' /> </NavLink>
      </Slider>


      {/* hidden nav bar so that the page knowns how far down to go */}
      <Slider
        speed={500}
        centerMode={true}
        infinite={true}
        className='nav-slider'

        adjustHeight={true}
        arrows={true}
        slidesPerRow={slideAmount}
        centerPadding={0}
        dots={true}
        slidesToScroll={1}
      >
        <Cube />
      </Slider>
    </div>
  );
}

export default Nav;
