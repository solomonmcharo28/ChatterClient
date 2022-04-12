import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import './user.css'
import './homepage.css'
// import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Users from '../../components/Users/users'
import newLogo from '../../chatter.gif'
import { isDOMComponent } from 'react-dom/test-utils';
// import {Link, Redirect} from 'react-router-dom'

const HomePage = (props) =>{
   
    
   
    
    if(!props.loggedIn){
        return(
          
            <div>
        <img src={newLogo} className="chatter" alt="logo" />
        <p>
          Welcome to  <code>Chatter</code>, where conversations happen.
        </p>
       <Link to="/login"><Button> Login</Button></Link> <Link to="/register"><Button href='localhost:3000/register'> Sign Up</Button></Link> 
       
        </div>
        
        );
        
    }
    else{
        
        return(
            <div>
                  <h1>Welcome {props.user.name}</h1>
                  <h2>Here are other users on the app</h2>
           <div className="usersDisplay">
                  <Users users={props.otherUsers} username={props.user.username} user={props.user} friendList={props.friendList} sentRequests={props.sentRequests} requests={props.requests}></Users>
           </div>
           </div>
        )
    }
}

export default HomePage