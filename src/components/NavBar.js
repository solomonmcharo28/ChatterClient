import React from 'react';
import './nav.css'
import axios from 'axios';
import { FaTools, FaRocketchat} from "react-icons/fa"
import {Link} from 'react-router-dom';
import Requests from './Requests/requests'
import { Navbar,  NavDropdown, Nav, Container, Button} from 'react-bootstrap';
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
 let requestData = null;
 let config = {
  headers: {
  Authorization: localStorage.getItem("thisToken"),
  }
}
  const logOutHandler = () => {
    
    axios.post('https://solo-chatappapi.herokuapp.com/users/logout', config, {
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
    <Navbar.Brand href="#home"> <FaRocketchat/> Chatter</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" style ={navStyle} >
    <Nav.Link href="/"> &nbsp;  Home</Nav.Link> 
        <Nav.Link>&nbsp;Friend Requests</Nav.Link>
        <NavDropdown title="About Us" id="basic-nav-dropdown" >
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
      requestData = props.requests 
      let numRequests = requestData.length == 0 ? "" :"(" + requestData.length + ")"
      const friends = "Friend Requests " + numRequests;
      return (<div>
        <Navbar bg="white" expand="lg">
          <Container>
        <Navbar.Brand href="#home"> <FaRocketchat/>  Chatter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style ={navStyle} >
        <Nav.Link href="/"> &nbsp;  Home</Nav.Link> 
            <NavDropdown title={friends} id="basic-nav-dropdown" >
            <Requests requests={requestData}></Requests>
            </NavDropdown>
            <NavDropdown title={props.loggedInPerson.name} id="basic-nav-dropdown" >
              <NavDropdown.Item href="/home">View Profile </NavDropdown.Item>
              <NavDropdown.Item href="/info" >Update User</NavDropdown.Item>
              <NavDropdown.Item onClick={logOutHandler} >Log Out</NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
           
        </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
        );



    }
}

export default theNavbar;