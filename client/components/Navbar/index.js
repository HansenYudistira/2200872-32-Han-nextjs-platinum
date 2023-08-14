import React, { useState, useEffect } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip
} from 'reactstrap';

// import component 
import LogoutModal from '../LandingPage/logoutModal';

//import api
import { UserTotalScore } from '../../api/userGamesApi';


function navbar(args){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [activeToken, setActiveToken] = useState({data: []})
  const [totalSkor, setTotalSkor] = useState(0);

  useEffect(async () => {
    try {
        const id = localStorage.getItem('tokenId')
        const username = localStorage.getItem('tokenUsername')
        const avatar = localStorage.getItem('tokenAvatar')

        if (username) {
            const newToken = {id, username, avatar}
            setActiveToken({data: newToken})

            UserTotalScore(id).then(async (result) => {
                if (result!== undefined) {
                    await setTotalSkor(Number(result.data))
                  } else {
                    console.log("No valid score data in the response.");
                }
              }).catch(error => {
                console.log("Error fetching score data:", error);
            });
        } 
    } catch (error) {
        console.log(error)
    }
}, []); 


    return(
      <div>
      <Navbar  style={{ backgroundColor: '#4E67EB' }} dark expand="md">
      <NavbarBrand href="/">
        <img src="/images/logo.jpeg" width={50} height={50} id="logoToHome"/>
        <UncontrolledTooltip
                placement="right"
                target="logoToHome"
                >
                HOME
        </UncontrolledTooltip>
      </NavbarBrand>
      
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="left-panel" navbar>
          <NavItem>
            <NavLink href="/community">Community</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about-us">About Us</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/share">Share</NavLink>
          </NavItem>            
        </Nav>
      </Collapse>
        
      {activeToken.data.username ? 
    <Nav className='right-panel' dark expand="md">
      <NavItem>
        <NavLink href ="/profile">
          <img src={activeToken.data.avatar} alt="" width={50} height={50} style={{ cursor: 'pointer' }} id="viewProfile"/>
        </NavLink>
        <UncontrolledTooltip
            placement="left"
            target="viewProfile"
            >
            View Profile
        </UncontrolledTooltip>
      </NavItem>
      <NavItem>
        <NavLink className="text-white">Hello, {activeToken.data.username} !</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-white">Your Score: {totalSkor}</NavLink>
      </NavItem>
      <NavItem>
          <LogoutModal />
      </NavItem>
    </Nav>
   : (
      <div>
          <Nav>
          <NavItem>
    <NavLink className="text-white">Hello, Guest !</NavLink>
  </NavItem>
      <NavItem>
          <NavLink href="/register" className="text-white">Register</NavLink>
          </NavItem>
      <NavItem>
            <NavLink href="/login "className="text-white" >Login</NavLink>
          </NavItem>

          </Nav>
  </div>
  )}
  </Navbar>
      </div>

    )
}

export default navbar