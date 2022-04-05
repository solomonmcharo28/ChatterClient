import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import './chat.css'
import './user.css'
// import styled from 'styled-components'
import Mustache from 'mustache';
import moment from 'moment';
import {Button} from 'react-bootstrap'
import Persons from '../../components/Persons/persons'
import { isDOMComponent } from 'react-dom/test-utils';
// import {Link, Redirect} from 'react-router-dom'
const socket =  io("http://localhost:3001");

class ChatPage extends Component{
   state = {
       user: {},
       viewTasks: false,
       viewRequests: false,
       viewReviews: false,
       task:[],
       request:[],
       chatName: '',

   }
   constructor(props){
     super(props)
    if(localStorage.getItem("thisToken") === "Bearer " || !localStorage.getItem("thisToken")){
        window.location.replace("/login")
    }
    else{
   
    }
   }
   togglePersonHandler = () =>{
    const doesShow = this.state.viewTasks;
    this.setState({viewTasks: !doesShow});
   }


   toggleRequestHandler = () =>{
    const doesShow = this.state.viewRequests;
    this.setState({viewRequests: !doesShow});
   }
   
 
   componentDidMount(){
    let config = {
        headers: {
        Authorization: localStorage.getItem("thisToken"),
        }
    }
  
    axios.get('http://localhost:3001/users/me', config, {
    })
    .then((response) => {
      console.log(response.data)
      this.state = {user:response.data}
      console.log(this.state.user)
      const username = this.state.user.name;
      const room = this.state.user.email;
      console.log(username, room)
      socket.emit('join', {username, room}, (error) => {
        if(error){
            alert(error)
            window.location.replace = '/'
        }
        console.log("Has Worked")
    })
     
    console.log("leo")
      //console.log(this.state.user.name)
    })
    .catch(function (error) {
      console.log(error.message);
      
  
  
    });
      const $messages = document.querySelector("#messages")
      console.log("Trying out")
     socket.on('locationMessage', (location) =>{
       console.log(location);
       const html = `<div > <p>
         <span class="message__name">${location.username}</span>
         <span class="message__meta">${moment(location.createdAt).format(" h:MM A")}</span>
     </p>
          <p class="message__text"> <a href=${location.url} target="_blank"> My current location </a></p>
         </div>`
       $messages.insertAdjacentHTML('beforeend', html)
       this.autoscroll()
 
     })

     socket.on('message', (msg) =>{
        const message = msg.text
        console.log(message);
        const createdAt = moment(msg.createdAt).format(" h:MM A")
        const html = `<div> 
        <p>
            <span class="message__name" autocapitalize="">${msg.username}</span>
            <span class="message__meta">${createdAt}</span>
        </p>
        <p> ${message} </p>
        </div>`
        $messages.insertAdjacentHTML('beforeend', html)
        this.autoscroll()
    })

    socket.on('roomData', (roomData) =>{
        const users = roomData.users.map((user, index) =>{
            console.log(user)
             return `<li>${user.username}</li>`
        })
        const html = `<h2 class="room-title">${roomData.room}</h2>
        <h3 class="list-title">Users in the Chat</h3>
        <ul class="users">
            ${users}
        </ul>`
        document.querySelector("#sidebar").innerHTML = html
     })
   }

   componentDidUpdate(){
      
    
    
   }

   
   autoscroll = () =>{
    const $messages = document.querySelector("#messages")
    const $newMessage = $messages.lastElementChild


    //Height of the Last Message 
    const newMessagesStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessagesStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    
    //Visisble Height
    const visibleHeight = $messages.offsetHeight

    //Height of Message Container
    const containerHeight = $messages.scrollHeight

    //How far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if(containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
    //console.log(newMessagesStyles)
}
   logOutHandler = () => {

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
   
sendMessage = (e) =>{
    e.preventDefault()
    const $messageForm = document.querySelector("#myMessage");
    const $messageFormButton = $messageForm.querySelector("button")
    const $messageFormInput = $messageForm.querySelector("input")

        $messageFormButton.setAttribute("disabled", "disabled")
        const msg = $messageFormInput.value;
        //console.log(msg)
        socket.emit("sendMessage", msg, (error) =>{
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = ' ';
            $messageFormInput.focus()
            if(error){
                return console.log(error)
            }
            console.log("The message was delivered")
        })
       
}
sendMyLocation = () => {
    if(!navigator.geolocation){
        alert("Browser does not support Geolocation");
        return;
    }
    const $locationButton = document.getElementById("sendLocation")
    $locationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
      
      console.log(position)
      socket.emit("sendLocation", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      }, (location)=> {
        console.log(location)
        $locationButton.removeAttribute('disabled')
      })

    })
}


    render (){

        return (
          
         <div className="row userbox chat">
           <div className="col-4 chat__sidebar" id="sidebar">
           </div>
           <div className="col-8  chat__main">
              <h1> {this.state.chatName}</h1>
              <hr></hr>
              <div id="messages" class="chat__messages"></div>
              <div class="compose">
            <form id="myMessage">
                <input placeholder="Type Message" name="message" id="textMessage" required autoComplete="off"/>
                <Button id="submit" name="submit" onClick={this.sendMessage}>Send</Button>
            </form>
            <Button id="sendLocation" onClick={this.sendMyLocation}>Send Location</Button>
             </div>
       </div>
       </div>
        );
        }
    }
        

export default ChatPage