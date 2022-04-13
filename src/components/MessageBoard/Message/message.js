import React from 'react';
// import './Person.css';
import './message.css'
import {FaUserAlt, FaCheck, FaSort} from  'react-icons/fa'
import { FcRight, FcLeft} from "react-icons/fc";
import moment from 'moment'
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
height: 80px;
overflow: scroll;
font-family: Roboto;
transition: ease-in 0.1s;
&:hover{
   border: 3px solid green;
    }
`;
const Message = (props) => {
    let online = null;
    if(props.online){
        online = "green"
    }
    else{
        online = "grey"
    }
    let messageName = ""
    if(props.currentUser === props.messageUser){
        messageName = "me"
    }
    else{
        messageName = props.messageName
    }
    const arrow = (messageName === "me") ? <FcRight /> : <FcLeft />;
   const toChatRoom = () =>{
 
      window.location.replace('/chat?chatRoom=' + props.name)
   }
   return (
   
    <StyledDiv className="row" >
        <div className="col-2">    
   <p>{props.chatName}</p>
   </div>
   <div className="col-6 lastMessage" >
   <p> <span class="chatName">{messageName}</span> : {props.message} </p>
   </div>
   <div className="col-4">
   <Button onClick={toChatRoom}>Chat</Button>
   <p> {arrow} {moment(props.date).calendar()}</p>
   </div>
   </StyledDiv> 
   
   );

}

export default Message;