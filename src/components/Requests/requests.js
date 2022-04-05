import React from 'react';
import Request from './Person/person'
const requests = (props) => props.persons.map((request, index)=>{
    return <Request
    name={person.name} 
    message={person.message}
    />
});


export default requests;