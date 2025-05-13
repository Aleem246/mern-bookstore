import React from 'react'
import {Link , NavLink} from "react-router-dom"
import logo from "../assets/react.svg"
const Header = () => {
  return (
     <header>
    <Link to="/">
      <img src={logo} alt="React logo" />
    </Link>
    
    <nav>
      <NavLink to="/"> Home </NavLink>
      <NavLink to="/books"> Books </NavLink>
      <NavLink to="/about"> About </NavLink>
    </nav>
   </header>
  )
}

export default Header