import React from 'react';
import './nav.css'
import axios from 'axios';
import { FaTools,} from "react-icons/fa"
import {Link} from 'react-router-dom';
import { Navbar,  NavDropdown, Nav, Container} from 'react-bootstrap';
const navStyle = {
    "paddingRight": "45px"
  }  
  const titleStyle = {
    "fontFamily" : "Quicksand",
    "fontWeight": "",
    "paddingTop": "5px",
    "fontColor" : "grey"
  }
  const navbarStyle = {
    "padding" : "20px"
  }
 
const theNavbar = (props) =>{

  const logOutHandler = () => {
    let config = {
      headers: {
      Authorization: localStorage.getItem("thisToken"),
      }
  }
    axios.post('http://localhost:3000/users/logout', config, {
    })
    .then((response) =>{
    })
    .catch(function (error) {
      console.log(error.message);
      
    });
        
        localStorage.removeItem("thisToken")
        window.location.replace("/")
   }

    if(props.loggedIn === false){
    return (<div>
    <Navbar bg="light" expand="lg">
      <Container>
    <Navbar.Brand href="#home"> <FaTools/> Chatter</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" style ={navStyle} >
    <Nav.Link href="/"> &nbsp;  Home</Nav.Link> 
        <Nav.Link>&nbsp;Operations</Nav.Link>
        <NavDropdown title="More Services" id="basic-nav-dropdown" >
          <NavDropdown.Item href="#action/3.2">Product 1</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
    );
    }
    else{

      return (<div>
        <Navbar bg="white" expand="lg">
        <Navbar.Brand href="#home"> <FaTools/>  eService</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style ={navStyle} >
        <Nav.Link href="/"> &nbsp;  Home</Nav.Link> 
            <Nav.Link>&nbsp;Operations</Nav.Link>
            <NavDropdown title={props.loggedInPerson.name} id="basic-nav-dropdown" >
              <NavDropdown.Item href="/homepage">View Profile</NavDropdown.Item>
              <NavDropdown.Item href="/info" >Update User</NavDropdown.Item>
              <NavDropdown.Item onClick={logOutHandler} >Log Out</NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
           
        </Navbar.Collapse>
      </Navbar>
      </div>
        );



    }
}

export default theNavbar;