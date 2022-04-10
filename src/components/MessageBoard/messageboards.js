import React from 'react';
import Message from './Message/Message'
const messeageboards = (props) => props.messages.map((message, index)=>{
    if(message.messagename !== props.messagename){
    return <Message 
    name={message.name} 
    messagename ={message.messagename}
    email = {message.email}
    id = {message._id}
    sender = {props.message}
    />
    }
});


export default messageboards;