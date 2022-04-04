import React, {Component} from 'react'
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import LoginForm from './components/Forms/loginUser'
import CreateForm from './components/Forms/createUser'
import NavBar from './components/NavBar'
import logo from './logo.svg';
import newLogo from './chatter.gif'
import './App.css';
import {Button} from 'react-bootstrap'

class App extends Component{
   state = {
    loggedIn: false,
    loggedInPerson : {

    },


    
   }
   render(){
  return (
    <BrowserRouter>

     <div className="App">
     <NavBar loggedIn={this.state.loggedIn} loggedInPerson={this.state.loggedInPerson}/>
     <header className="App-header">
       <Routes>
    <Route exact path="/" element={
   <div>
        <img src={newLogo} className="chatter" alt="logo" />
        <p>
          Welcome to  <code>Chatter</code>, where conversations happen.
        </p>
       <Link to="/login"><Button> Login</Button></Link> <Link to="/register"><Button href='localhost:3000/register'> Sign Up</Button></Link> 
       
        </div>
        
    }/>
    <Route exact path="/login" element={<LoginForm />}/>
    <Route exact path="/register" element={<CreateForm />}/>
    </Routes>
  </header>
    </div>
    
   
    </BrowserRouter>
  );
  }
}
export default App;
