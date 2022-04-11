import React from 'react';
import Message from './Message/message'
const messageboards = (props) => props.messageBoards.map((messageBoard, index)=>{
    //console.log(messageBoard.messages[0].message.msg)
    if(messageBoard.messages.length > 0){
      let ChatName = null;
      if(messageBoard.chatName === ""){
      if(props.currentUser.id !== messageBoard.owner1){
          ChatName = messageBoard.chatName1
      }
      else{
          ChatName = messageBoard.chatName2
      } 
    }
    else{
        ChatName = messageBoard.chatName
    }

    return <Message 
    name={messageBoard.name} 
    messageName ={messageBoard.messages[messageBoard.messages.length-1].message.username}
    message = {messageBoard.messages[messageBoard.messages.length-1].message.msg}
    date = {messageBoard.messages[messageBoard.messages.length-1].message.createdAt}
    chatName = {ChatName}
    />
    }
});


export default messageboards;