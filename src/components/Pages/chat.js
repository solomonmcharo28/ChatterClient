import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import {BsFillChatFill } from "react-icons/bs";
import './chat.css'
import './user.css'
// import styled from 'styled-components'
import Mustache from 'mustache';
import moment from 'moment';
import {Button} from 'react-bootstrap'
import Persons from '../../components/Persons/persons'
import { isDOMComponent } from 'react-dom/test-utils';
import { FaThList } from 'react-icons/fa';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
// import {Link, Redirect} from 'react-router-dom'
const socket =  io("https://solo-chatappapi.herokuapp.com");

class ChatPage extends Component{
   state = {
       user: {},
       viewTasks: false,
       viewRequests: false,
       viewReviews: false,
       task:[],
       request:[],
       chatName: '',
       mounted: false,
       messageBoard:[]

   }
   constructor(props){
     super(props)
    if(localStorage.getItem("thisToken") === "Bearer " || !localStorage.getItem("thisToken" )){
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
    const $messages = document.querySelector("#messages")
       console.log("component did mount")
    let config = {
        headers: {
        Authorization: localStorage.getItem("thisToken"),
        }
    }
    
    axios.get('https://solo-chatappapi.herokuapp.com/users/me', config, {
    })
    .then((response) => {
      console.log(response.data)
      this.state.user = response.data 
      this.state.mounted = true
      console.log(this.state.user)
      socket.emit('token', {token: localStorage.getItem("thisToken")}, (error) => {
        if(error){
            alert(error)
            
        }
        console.log("Token Has Worked")
    })  
      const username = this.state.user.name;
      let url = window.location.search;
      url = url.split("=")[1]
      const room = url;
      console.log(username, room)
      socket.emit('join', {username, room}, (error) => {
        if(error){
            alert(error)
            window.location.replace('/')
        }
        console.log("Has Worked")
    })
     
     //  console.log("leo")
      //console.log(this.state.user.name)
      
    axios.get('https://solo-chatappapi.herokuapp.com/boards/' + room, config, {
    })
    .then((response) =>{
       
        console.log("Its working")
        this.state.messageBoard = response.data;
        const messageBoard = this.state.messageBoard.messages;
        if(this.state.messageBoard.chatName === ""){
        if(this.state.user._id !== response.data.owner1){
            this.setState({chatName : response.data.chatName1});
        }
        else{
            this.setState({chatName : response.data.chatName2});
        }
        }      
        console.log(messageBoard)
        for(var i = 0; i<messageBoard.length; i++){
            const message = messageBoard[i].message.msg;
            console.log(message);
            const createdAt = moment(messageBoard[i].message.createdAt).format(" h:mm A")
            if(i ==0){
                const calendarOffset = moment(messageBoard[i].message.createdAt).calendar()
                let offsetReference = calendarOffset.split("at")[0]
                if(offsetReference.includes("Last")){
                    offsetReference = offsetReference.split(" ")[1]
                }
                const html2 = `<div> 
                <p>
                    <span class="message__meta">${offsetReference}</span>
                </p>
                </div>`
                $messages.insertAdjacentHTML('beforeend', html2)
            }
            else if(i > 0){
                const date1 = new Date(moment(messageBoard[i].message.createdAt).format('MM/DD/YYYY'))
                const date2 = new  Date(moment(messageBoard[i-1].message.createdAt).format('MM/DD/YYYY'))
                if(date1.getTime() > date2.getTime()){
                const calendarOffset = moment(messageBoard[i].message.createdAt).calendar()
                let offsetReference = calendarOffset.split("at")[0]
                if(offsetReference.includes("Last")){
                    offsetReference = offsetReference.split(" ")[1]
                }
                const html2 = `<div> 
                <p>
                    <span class="message__meta">${offsetReference}</span>
                </p>
                </div>`
                $messages.insertAdjacentHTML('beforeend', html2)
                }
            }
            let html = `<h1> hello world </h1>`;
            if(messageBoard[i].message.sender === this.state.user._id){
              html = `<div class="messageSender"> 
            <p>
                <span class="message__nameS" autocapitalize="words">${messageBoard[i].message.username}</span>
                <span class="message__meta">${createdAt}</span>
            </p>
            <p class="message__text"> ${message} </p>
            </div>`
            }
            else{
                html = `<div class="messageReceipt"> 
                <p>
                    <span class="message__nameR" autocapitalize="words">${messageBoard[i].message.username}</span>
                    <span class="message__meta">${createdAt}</span>
                </p>
                <p class="message__text"> ${message} </p>
                </div>`
            }
            $messages.insertAdjacentHTML('beforeend', html)
            if(i === messageBoard.length - 1){
                const now = new Date();
                const date1 = new Date(moment(now).format('MM/DD/YYYY'))
                const date2 = new  Date(moment(messageBoard[i].message.createdAt).format('MM/DD/YYYY'))
                if(date1.getTime() > date2.getTime()){
                const calendarOffset = moment(now).calendar()
                const offsetReference = calendarOffset.split("at")
                const html2 = `<div> 
                <p>
                    <span class="message__meta">${offsetReference[0]}</span>
                </p>
                </div>`
                $messages.insertAdjacentHTML('beforeend', html2)
                }
            }
        
        }
        $messages.scrollTop = $messages.scrollHeight
        
    })
    .catch(function (error) {
      console.log(error.message);
      
    });
    
    })
    .catch(function (error) {
      console.log(error.message);
    });
     
      console.log("Trying out")
     socket.on('locationMessage', (location) =>{
       console.log(location);
       let html = "<h1> Hello World </h1>"
       if(location.sender === this.state.user._id){
       html = `<div class="messageSender"> <p>
         <span class="message__nameS">${location.username}</span>
         <span class="message__meta">${moment(location.createdAt).format(" h:mm A")}</span>
     </p>
          <p class="message__text"> <a href=${location.url} target="_blank"> My current location </a></p>
         </div>`
       }
       else{
         html = `<div class="messageReceipt"> <p>
         <span class="message__nameR">${location.username}</span>
         <span class="message__meta">${moment(location.createdAt).format(" h:mm A")}</span>
     </p>
          <p class="message__text"> <a href=${location.url} target="_blank"> My current location </a></p>
         </div>`
       }
       $messages.insertAdjacentHTML('beforeend', html)
       this.autoscroll()
 
     })

     socket.on('message', (msg) =>{
        const message = msg.text
        console.log(message);
        const createdAt = moment(msg.createdAt).format(" h:mm A")
        let html = `<h1> hellow world </h1>`
        if(msg.sender === this.state.user._id){
            html = `<div class="messageSender"> 
          <p>
              <span class="message__nameS" autocapitalize="words">${msg.username}</span>
              <span class="message__meta">${createdAt}</span>
          </p>
          <p class="message__text"> ${message} </p>
          </div>`
          }
          else{
              html = `<div class="messageReceipt"> 
              <p>
                  <span class="message__nameR" autocapitalize="words">${msg.username}</span>
                  <span class="message__meta">${createdAt}</span>
              </p>
              <p class="message__text"> ${message} </p>
              </div>`
          }
        $messages.insertAdjacentHTML('beforeend', html)
        this.autoscroll()
    })

    socket.on('roomData', (roomData) =>{
        const users = roomData.users.map((user, index) =>{
            //onsole.log(user.username,this.state.user.name.toLowerCase() )
            //console.log(user)
             return `<li class="activeName">${user.username}</li>`
        })
        const html = `<h2 class="room-title">Chatter</h2>
        <h3 class="list-title">Users Active in the Chat</h3>
        <ul class="users">
            ${users.join(" ")}
        </ul>`
        document.querySelector("#sidebar").innerHTML = html
     })

     var form = document.getElementById("myMessage");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
   }

   componentDidUpdate(){
      
    
    
   }

   
   autoscroll = () =>{
    const $messages = document.querySelector("#messages")
    const $newMessage = $messages.lastElementChild
    console.log($newMessage)

    //Height of the Last Message 
    const newMessagesStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessagesStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    console.log(newMessageHeight)
    //Visisble Height
    const visibleHeight = $messages.offsetHeight
    console.log(visibleHeight)
    //Height of Message Container
    const containerHeight = $messages.scrollHeight
    console.log("scroll height : " + $messages.scrollHeight + ", scrollTop " + $messages.scrollTop)
    //How far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight;
    $messages.scrollTop = 700;
    if(containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
        this.forceUpdate()
    }
    //console.log(newMessagesStyles)
}
   logOutHandler = () => {

    let config = {
      headers: {
      Authorization: localStorage.getItem("thisToken"),
      }
  }
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
   
sendMessage = (e) =>{
    e.preventDefault()
    const $messageForm = document.querySelector("#myMessage");
    const $messageFormButton = $messageForm.querySelector("button")
    const $messageFormInput = $messageForm.querySelector("input")

        $messageFormButton.setAttribute("disabled", "disabled")
        const msg = $messageFormInput.value;
        const message = {
            msg,
            sender: this.state.user._id,

        }
        //console.log(msg)
        socket.emit("sendMessage", message, (error) =>{
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = ' ';
            $messageFormInput.focus()
            if(error){
                return console.log(error)
            }
            console.log("The message was delivered")
        })
       
}
sendMyLocation = (e) => {
    e.preventDefault()
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
          longitude: position.coords.longitude,
          sender: this.state.user._id,
      }, (location)=> {
        console.log(location)
        $locationButton.removeAttribute('disabled')
      })

    })
}


    render (){

        return (
          
         <div className="row userbox chat">
           
           <div className="col-8  chat__main">
              <h1> Chat with {this.state.chatName} &nbsp;   &nbsp;<BsFillChatFill /> </h1>
              <hr style={{color:"white"}}></hr>
              <div id="messages" class="chat__messages"></div>
              <div class="compose">
            <form id="myMessage">
                <input placeholder="Type Message" name="message" id="textMessage" required autoComplete="off"/>
                <Button id="submit" name="submit" onClick={this.sendMessage}>Send</Button>
            </form>
            <Button id="sendLocation" onClick={this.sendMyLocation}>Share Location</Button>
             </div>
       </div>
       <div className="col-4 chat__sidebar" id="sidebar">
           </div>
       </div>
        );
        }
    }
        

export default ChatPage