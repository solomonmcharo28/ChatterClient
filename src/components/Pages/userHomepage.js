import React, {Component} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import './user.css'
// import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import Persons from '../../components/Persons/persons'
import { isDOMComponent } from 'react-dom/test-utils';
// import {Link, Redirect} from 'react-router-dom'

class UserHomepage extends Component{
   state = {
       user: {},
       viewTasks: false,
       viewRequests: false,
       viewReviews: false,
       task:[],
       request:[]
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
    this.setState({user:response.data})
    console.log(this.state.user)
    const socket = io("http://localhost:3001")
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

      /*
    
    });

    axios.get('http://localhost:3000/tasks', config, {
      })
      .then((response) =>{
        this.setState({task:response.data})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });
    
      axios.get('http://localhost:3000/mytasks', config, {
      })
      .then((response) =>{
        this.setState({request:response.data})
      })
      .catch(function (error) {
        console.log(error.message);
        
      });
    */
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
   


    render (){
  
        let Friends = null;
        let friendList = [{name: "John Doe", message: "hello this is a message"}, {name: "Helena", message: "hi"}, {name: "Joel", message:"howdy"}]
        Friends = (<Persons persons ={friendList}> </Persons>)
        const style = {
            "display" : "flex",
            "flexWrap" : "wrap",
            
          }

        return (
          
         <div className="row userbox">
           <div className="col-4 friends">
             <h1>Friends Online ({friendList.length})</h1>
             <hr></hr>
             {Friends}
           </div>
           <div className="col-8 ">
              <h1> Recent Conversations</h1>
              <hr></hr>
             
             <p>You have {this.state.task.length} new Messages</p>
             <Button onClick={this.togglePersonHandler}>View requests</Button>
         
             <p></p>
             <Button onClick={this.toggleRequestHandler}>View services requested</Button>
    
             </div>
       </div>
        );
        }
    }
        

export default UserHomepage