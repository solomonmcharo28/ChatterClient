import React from 'react';
import Person from './Person/person'
const persons = (props) => props.persons.map((person, index)=>{
    return <Person 
    name={person.name} 
    username = {person.username}
    online = {person.online}
    currentUser = {props.username}
    />
});


export default persons;