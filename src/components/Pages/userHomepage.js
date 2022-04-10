import React, {Component} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import './user.css'
// import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import Persons from '../../components/Persons/persons'
import Requests from '../../components/Requests/requests'
import { isDOMComponent } from 'react-dom/test-utils';
// import {Link, Redirect} from 'react-router-dom'
const socket = io("http://localhost:3001")
class UserHomepage extends Component{
   state = {
       user: {},
       viewTasks: false,
       viewRequests: false,
       viewReviews: false,
       sentRequests:[],
       request:[],
       friendList:[],
       countOnline:0,
   }
  
   constructor(props){
     super(props)
    if(localStorage.getItem("thisToken") === "Bearer " || !localStorage.getItem("thisToken")){
        window.location.replace("/login")
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
    this.state.user = response.data
    console.log(this.state.user)
    socket.emit('token', {token: localStorage.getItem("thisToken")}, (error) => {
      if(error){
          alert(error)
          
      }
      console.log("Token Has Worked")
  })
   
  console.log("leo")
    for(var i = 0; i<this.state.user.friendList.length; i++){
        let friend = this.state.user.friendList[i];
        console.log(friend)
      axios.get('http://localhost:3001/users/' + friend.friend)
      .then((response) =>{
        let newFriendList = this.state.friendList
        newFriendList.push(response.data)
        let newCountOnline = this.state.countOnline;
        if(response.data.online){
          newCountOnline += 1;
        }
        this.setState({friendList : newFriendList, countOnline: newCountOnline})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });
    }
    console.log(this.state.friendList)
  })
  .catch(function (error) {
    console.log(error.message);
    


  });
  /*
    axios.get('http://localhost:3001/requests', config, {
      })
      .then((response) =>{
        this.setState({sentRequests:response.data})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });
      */
    
      axios.get('http://localhost:3001/myrequests', config, {
      })
      .then((response) =>{
        this.setState({request:response.data})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });
    
   }

   logOutHandler = () => {

    let config = {
      headers: {
      Authorization: localStorage.getItem("thisToken"),
      }
  }
    axios.post('http://localhost:3001/users/logout', config, {
    })
    .then((response) =>{
    })
    .catch(function (error) {
      console.log(error.message);
      
    });
        
        localStorage.removeItem("thisToken")
        window.location.replace("/")
   }
   


    render (){
  
        let Friends = null;
        let friendList = this.state.friendList
        if(friendList)Friends = (<Persons persons ={friendList} username={this.state.user.username}>  </Persons>)
        const style = {
            "display" : "flex",
            "flexWrap" : "wrap",
            
          }
         let MyRequests = null;
         if(this.state.viewRequests){
           
            MyRequests = ( <Requests requests={this.state.request} ></Requests>);
           
         }
        return (
          
         <div className="row userbox">
           <div className="col-4 friends container">
             <h1>Friends <i>Online</i>({this.state.countOnline})</h1>
             <hr style={{borderColor:"white"}}></hr>
             {Friends}
           </div>
           <div className="col-8 ">
              <h1> Recent Conversations</h1>
              <hr style={{borderColor:"white"}}></hr>
             
             <p>You have {this.state.request.length} Requests</p>
             <Button onClick={this.toggleRequestHandler}>View Friend requests</Button>
             {MyRequests}
             <p></p>
             <Button onClick={this.toggleRequestHandler}>View Friends requests sent</Button>
               
             </div>
       </div>
        );
        }
    }
        

export default UserHomepage