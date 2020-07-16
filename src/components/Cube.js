import React from 'react';
import '../css/Cube.scss';

function Cube() {
  return(
    <div class="cube">
      <div className='cube-face cube-face-front'>  </div>
      <div className='cube-face cube-face-back'>   </div>
      <div className='cube-face cube-face-left'>   </div>
      <div className='cube-face cube-face-right'>  </div>
      <div className='cube-face cube-face-top'>    </div>
      <div className='cube-face cube-face-bottom'> </div>
    </div>
  );
}

export default Cube;
