import React from 'react';
import Person from './Person/person'
const persons = (props) => props.persons.map((person, index)=>{
    return <Person 
    name={person.name} 
    message={person.message}
    />
});


export default persons;