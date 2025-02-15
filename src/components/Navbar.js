import React from 'react';
import Logo from '../assets/pizzaLogo.png';

function Navbar() {
  return (
    <div className='navbar'>
      <div className="leftSide"></div>
      <div className="rightSide"></div>
        <img src={Logo}/>
    </div>
  );
}

export default Navbar
