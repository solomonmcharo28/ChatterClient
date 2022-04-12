import React from 'react';
import {Buffer} from 'buffer';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios';
const StyledDiv = styled.div`
width: 20%;
margin: 16px auto;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
padding: 16px;
text-align: center;
border-radius:5px;
font-family: Roboto;
transition: ease-in 0.1s;
@media (min-width: 500px){
        width:450px;
    }
&:hover{
   box-shadow: 0 2px 3px grey;
   background-color: grey;
    }
`;
const User = (props) => {
    const sendRequest = () =>{
          const name = props.sender.name;
          const receiver = props.id;
          const data = {
              name, 
              receiver
          }
          let config = {
            headers: {
            Authorization: localStorage.getItem("thisToken"),
            }
        }
          axios.post('http://localhost:3001/requests', data, config)
          .then( (response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            
          });
          this.forceUpdate()
        }
    
    const url = "/connect?id=" 
    let Request = (<Button onClick={sendRequest}> Request <FaCheck/></Button>)
    if(props.friends){
        Request = (<Button variant="success"disabled> Friends <FaCheck/></Button>)
    }
    else if(props.sentRequest){
        Request = (<Button variant="info" disabled> Sent <FaCheck/></Button>)
    }
    else if(props.receiveRequest){
        Request = (<Button disabled> Request <FaCheck/></Button>)
    }
   return (
   
    <StyledDiv >  
   <p >{props.name}</p>
   <FaUserAlt/>
   <p>Username : {props.username}  </p>
   {Request}

   </StyledDiv> 
   
   );

}

export default User;