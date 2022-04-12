import React from 'react';
import User from './User/user'
const users = (props) => props.users.map((user, index)=>{
    if(user.username !== props.username){
      let Friends = false;
      let SentRequest = false;
      let ReceiveRequest = false
      if(props.friendList.indexOf(user._id) >= 0){
          Friends = true;
      }
      else if(props.sentRequests.indexOf(user._id) >= 0){
          SentRequest = true;
      }
      else if(props.requests.indexOf(user._id) >= 0){
          ReceiveRequest = true;
      }

      
    return <User 
    name={user.name} 
    username ={user.username}
    email = {user.email}
    id = {user._id}
    sender = {props.user}
    friends = {Friends}
    sentRequest = {SentRequest}
    receiveRequest = {ReceiveRequest}
    />
    }
});


export default users;