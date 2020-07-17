import React from 'react';
import'../css/Cube.scss';

function Cube() {
  return(
    <div className='scene'>
      <div className='cube-face cube-inner-circle'>
        <img src={'/img/gear.png'} className="cube-inner-static-logo" alt="logo" />
      </div>
      <div className='cube'>
        <div className='cube-face cube-inner-circle cube-inner-rotating-circle'>
          <img src={'/img/gear.png'} className="cube-inner-rotating-logo" alt="logo" />
        </div>
        <div className='cube-face cube-face-front'>  </div>
        <div className='cube-face cube-face-back'>   </div>
        <div className='cube-face cube-face-left'>   </div>
        <div className='cube-face cube-face-right'>  </div>
        <div className='cube-face cube-face-top'>    </div>
        <div className='cube-face cube-face-bottom'> </div>
      </div>
    </div>
  );
}

export default Cube;
