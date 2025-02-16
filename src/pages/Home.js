import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
        <div className="headerContainer">
            <h1> Gals's Pizzaeria</h1>
            <p> All GALS CAN DO THIS</p>
            <Link to="/menu">
            <button> TRY NOW </button>
            </Link>
        </div>
    </div>
  )
}

export default Home
