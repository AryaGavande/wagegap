import React, {useState} from 'react';
import Logo from '../assets/nlogo.png'; // Correct import
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';

function Navbar() {

    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };

  return (
    <div className='navbar'>
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="Logo" /> {/* Use imported Logo variable */}
        <div className="hiddenLinks">
            <Link to="/"> Home </Link>
            <Link to="/bot"> AI </Link>
            <Link to="/salary"> Salary </Link>
            <Link to="/about">About Us</Link>
        </div>
      </div>
      
        <div className="rightSide">
            <Link to="/"> Home </Link>
            <Link to="/bot"> AI </Link>
            <Link to="/salary"> Salary </Link>
            <Link to="/about">About Us</Link>
            <button onCLick={toggleNavbar}>
                <ReorderIcon />
            </button>
            
        </div>
        
    </div>
  );
}

export default Navbar;
