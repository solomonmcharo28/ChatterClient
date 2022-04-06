import React from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import axios from 'axios'
import styled from 'styled-components'
import {Button} from 'react-bootstrap'
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
    let config = {
        headers: {
        Authorization: localStorage.getItem("thisToken"),
        }
    }
    const makeFriends = () =>{


        return;
    }

    const deleteRequest = () =>{
        console.log("deleting the request")
        axios.delete('http://localhost:3001/requests/' + props.id, config,{}).then(response =>{
            console.log(response.data)
         })

        
    }
    
    
   return (
   
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

export default Request;