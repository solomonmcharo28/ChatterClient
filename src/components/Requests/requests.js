import React from 'react';
import Request from './Request/request'
const requests = (props) => props.requests.map((request, index)=>{
    return <Request
    name={request.name} 
    message={request.message}
    sender={request.sender}
    receiver={request.receiver}
    id = {request._id}
    />
});


export default requests;