import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(()=>{
   const changeWidth=()=>{ setScreenWidth(window.innerWidth);
   }
   window.addEventListener('resize',changeWidth);
  
  },[])
  return (
    <>
<div classNameName="nav-container">
      <div classNameName="navbar">
        {(toggleMenu || screenWidth > 600) &&(
        <div classNameName="nav-links">         
          <Link to="/" classNameName="items" onClick={toggleNav}> 
            Home
          </Link>
          <Link to="/register" classNameName="items" onClick={toggleNav}>
            Register
          </Link>
          <Link to="/login" classNameName="items" onClick={toggleNav}>
            Login
          </Link>
         
        </div>
        )}
        <div classNameName="right-side">
            <FontAwesomeIcon classNameName='nav-icon' icon={faBars} onClick={toggleNav}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header