import React from 'react';
import User from './User/user'
const users = (props) => props.users.map((user, index)=>{
    if(user.username !== props.username){
    return <User 
    name={user.name} 
    username ={user.username}
    email = {user.email}
    id = {user._id}
    sender = {props.user}
    />
    }
});


export default users;