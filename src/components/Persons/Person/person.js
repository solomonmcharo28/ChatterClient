import React from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'

import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const StyledDiv = styled.div`
width: 100%;
margin: 16px auto;
display: flex;
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
const Person = (props) => {
    
   return (
   
    <StyledDiv className="row" >
        <div className="col-4">    
   <p>{props.name}</p>
   </div>
   <div className="col-8">
   <p> hello {props.message}</p>

   </div>
   </StyledDiv> 
   
   );

}

export default Person;