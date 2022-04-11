import React, {Component} from 'react'
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import LoginForm from './components/Forms/loginUser'
import CreateForm from './components/Forms/createUser'
import UserHomePage from './components/Pages/userHomepage'
import HomePage from './components/Pages/homepage'
import ChatPage from './components/Pages/chat'
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
    otherUsers: [],
    requests:[]
  }
   constructor(props){
     super(props)
    if(localStorage.getItem("thisToken") !== "Bearer " && localStorage.getItem("thisToken")){
      let config = {
          headers:{
              Authorization: localStorage.getItem("thisToken") 
          }
      }
      axios.get('http://localhost:3001/users/me',config).then(response =>{
      this.setState({loggedInPerson:response.data, loggedIn: true})
      console.log(this.state.loggedInPerson);
      axios.get('http://localhost:3001/users/all').then(response =>{
        this.setState({otherUsers: response.data})
        console.log(response.data)
     })

    axios.get('http://localhost:3001/myrequests', config, {
    })
    .then((response) =>{
      this.setState({requests: response.data})
    })
    .catch(function (error) {
      console.log(error.message);
      
    });

   });



   }
  }
   
   render(){
  return (
    <BrowserRouter>

     <div className="App">
     <NavBar loggedIn={this.state.loggedIn} loggedInPerson={this.state.loggedInPerson} requests={this.state.requests}/>
     <header className="App-header">
       <Routes>
    <Route exact path="/" element={<HomePage loggedIn={this.state.loggedIn} user={this.state.loggedInPerson} otherUsers={this.state.otherUsers}/>}/>
    <Route exact path="/login" element={<LoginForm />}/>
    <Route exact path="/register" element={<CreateForm />}/>
    <Route exact path="/home" element = {<UserHomePage />} />
    <Route exact path="/chat" element = {<ChatPage />} />
    </Routes>
  </header>
    </div>
    
   
    </BrowserRouter>
  );
  }
}
export default App;
