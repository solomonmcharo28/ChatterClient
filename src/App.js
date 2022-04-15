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
    requests:[],
    friendListID:[], 
    sentRequests: [],
    requestsID: [],

  }
   constructor(props){
     super(props)
    if(localStorage.getItem("thisToken") !== "Bearer " && localStorage.getItem("thisToken")){
      let config = {
          headers:{
              Authorization: localStorage.getItem("thisToken") 
          }
      }
      axios.get('https://solo-chatappapi.herokuapp.com/users/me',config).then(response =>{
      this.setState({loggedInPerson:response.data, loggedIn: true})
      console.log(this.state.loggedInPerson);
      const theFriendList = response.data.friendList
      var friendID = []
      for(var i =0; i< theFriendList.length; i++){
          friendID.push(theFriendList[i].friend)
      }
      this.setState({friendListID : friendID})
 
      axios.get('https://solo-chatappapi.herokuapp.com/users/all').then(response =>{
        this.setState({otherUsers: response.data})
        console.log(response.data)
     }).catch(function (error) {
      console.log(error.message);
      
    });

    axios.get('https://solo-chatappapi.herokuapp.com/myrequests', config, {
    })
    .then((response) =>{
       const requestID = [];
       console.log("received Requests")
       console.log(response.data)
       for(var i = 0; i<response.data.length; i++){
        requestID.push(response.data[i].sender);
      }
      this.setState({requests: response.data})
      this.setState({requestsID: requestID})
    })
    .catch(function (error) {
      console.log(error.message);
      
    });

    axios.get('https://solo-chatappapi.herokuapp.com/requests', config, {
    })
    .then((response) =>{
      console.log("Sent Requests!")
      console.log(response.data)
      const sentRequestID = []
      for(var i = 0; i<response.data.length; i++){
        sentRequestID.push(response.data[i].receiver);
      }
      console.log(sentRequestID)
      this.setState({sentRequests: sentRequestID})
    })
    .catch(function (error) {
      console.log(error.message);
      
    });

   }).catch(function (error) {
    console.log(error.message);
    
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
    <Route exact path="/" element={<HomePage loggedIn={this.state.loggedIn} user={this.state.loggedInPerson} otherUsers={this.state.otherUsers} friendList={this.state.friendListID} sentRequests={this.state.sentRequests} requests={this.state.requestsID}/>}/>
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
