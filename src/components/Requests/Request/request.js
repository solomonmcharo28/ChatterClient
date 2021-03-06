import React, {useState} from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import axios from 'axios'
import styled from 'styled-components'
import { Navbar,  NavDropdown, Nav, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
const StyledDiv = styled.div`
width: 100%;
margin: 16px auto;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
font-size: 20px;
color: black;
background-color: white;
text-align: center;
height: 40px;
overflow: hidden;
font-family: Quicksand;
transition: ease-in 0.1s;
@media (min-width: 500px){
        width:450px;
    }
&:hover{
   box-shadow: 0 2px 3px grey;
   background-color: grey;
    }
`;
const Request = (props) => {
    const inputState = useState({friends: false})
    let config = {
        headers: {
        Authorization: localStorage.getItem("thisToken"),
        }
    }
    const makeFriends = () =>{

    axios.get('https://solo-chatappapi.herokuapp.com/users/' + props.sender, {
    })
    .then((response) =>{
        const sender = response.data;
        axios.get('https://solo-chatappapi.herokuapp.com/users/me', config,  {
    })
    .then((response) =>{
        const receiver = response.data;
        
        const senderFriendList = sender.friendList;
        const receiverFriendList = receiver.friendList;
        senderFriendList.push({friend : receiver._id});
        receiverFriendList.push({friend : sender._id});
        console.log(receiverFriendList, senderFriendList)
        const data1 = {
            friendList: receiverFriendList
        }
        const data2 = {
            friendList: senderFriendList
        }
            axios.patch('https://solo-chatappapi.herokuapp.com/users/me',data1 ,  config)
            .then((response) =>{
            })
            .catch(function (error) {
            console.log(error.message);
            
            });
          
            axios.patch('https://solo-chatappapi.herokuapp.com/users/' + props.sender, data2)
            .then((response) =>{
            })
            .catch(function (error) {
            console.log(error.message);
            
            })
  
            axios.delete('https://solo-chatappapi.herokuapp.com/requests/' + props.id, config,{}).then(response =>{
                console.log(response.data)
             })

             let chatNames = []
             chatNames.push(sender.username)
             chatNames.push(receiver.username)
             chatNames.sort()
             const chatRoomName = chatNames.join('')
             
             const data3 = {
                 name: chatRoomName,
                 owner2: sender._id,
                 chatName2: sender.name,
                 chatName1: receiver.name,
                 chatName: ""
             }
            
             axios.post('https://solo-chatappapi.herokuapp.com/boards', data3, config)
             .then( (response) => {
               console.log(response.data);
               this.setState({loggedIn: true});
               window.location.replace("/login")
             })
             .catch((error) => {
               console.log(error);
               
             });



             

    })
    .catch(function (error) {
      console.log(error.message);
      
    })
    }).catch(function (error) {
        console.log(error.message);
        
    })

        return;
    }
    
    const deleteRequest = () =>{
        console.log("deleting the request")
        axios.delete('https://solo-chatappapi.herokuapp.com/requests/' + props.id, config,{}).then(response =>{
            console.log(response.data)
         })

        
    }

    
   return (
   
    <NavDropdown.Item >
    
   <p>{props.name} &nbsp; &nbsp; <FaUserAlt/> </p>
   <Button onClick={makeFriends}> Accept</Button>
   <Button onClick={deleteRequest} variant="danger"> Ignore </Button>
   </NavDropdown.Item> 
   
   );

}

export default Request;
/*


    <StyledDiv className="row" >
        <div className="col-4">    
   <p>{props.name}</p>
   </div>
   <div className="col-8">
   <Button onClick={makeFriends} variant="success"> Accept</Button>
   <Button onClick={deleteRequest} variant="danger"> Ignore </Button>
   </div>
   </StyledDiv> 
   
   );

}




*/