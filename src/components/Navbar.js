import React from 'react';
import Logo from '../assets/pizzaLogo.png'; // Correct import

function Navbar() {
  return (
    <div className='navbar'>
      <div className="leftSide">
        <img src={Logo} alt="Pizza Logo" /> {/* Use imported Logo variable */}
      </div>
      <div className="rightSide"></div>
    </div>
  );
}

export default Navbar;
