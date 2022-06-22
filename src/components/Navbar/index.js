import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import './Navbar.css'

function Navbar() {
  return (
    <>
        <Nav className='navbar'>
            <NavLink to="/" className="brand_text" style={{color: "#fff"}}>
                Camp&Go
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to="/" activestyle="true">
                    Home
                </NavLink>
                <NavLink to="/favourites" activestyle="true">
                    Favourites
                </NavLink>    
                <NavLink to="/about" activestyle="true">
                    About
                </NavLink>                                             
            </NavMenu>
            
            <NavBtn>
                <NavBtnLink to='signin'>Sign In</NavBtnLink>    
            </NavBtn>

        </Nav>
    </>
  )
}

export default Navbar