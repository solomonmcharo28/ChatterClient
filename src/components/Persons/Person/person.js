import React from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck, FaSort} from  'react-icons/fa'

import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const StyledDiv = styled.div`
width: 100%;
margin: 16px auto;
display: flex;
border: 1px solid #eee;
border-radius: 10px;
font-size: 18px;
color: black;
align-items : center;
background-color: white;
text-align: center;
height: 60px;
overflow: hidden;
font-family: Roboto;
transition: ease-in 0.1s;
&:hover{
   border: 3px solid green;
    }
`;
const Person = (props) => {
    let online = null;
    if(props.online){
        online = "green"
    }
    else{
        online = "grey"
    }
   const toChatRoom = () =>{
     const names = [];
      names.push(props.username)
      names.push(props.currentUser)
      names.sort()
      const chatRoomName = names.join('')
      window.location.replace('/chat?chatRoom=' + chatRoomName)
   }
   return (
   
    <StyledDiv className="row" >
        <div className="col-4">    
   <p>{props.name}</p>
   </div>
   <div className="col-4">
   <p> <FaUserAlt color={online}/> {props.username}</p>

   </div>
   <div className="col-4">
   <Button onClick={toChatRoom}>Chat</Button>

   </div>
   </StyledDiv> 
   
   );

}

export default Person;