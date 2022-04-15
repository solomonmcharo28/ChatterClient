import React, {Component} from 'react';
import axios from 'axios';
// import './Person.css';
import './formClasses.css'
import validator from 'validator';
import styled from 'styled-components'
import Input from '../UI/Input/input.js';
import {Form , Button} from 'react-bootstrap'
class LoginForm extends Component{
  state = {
    loginForm:{
      email: {
        elementType: "input",
        elementConfig:{
          type:'email',
          placeholder:'example@email.com',
          id:"email"
        },
        value: '',
        label: 'Email',
        validation: {
          required:true,
          isEmail: true,
          
       }

      },
      password: {
        elementType: "input",
        elementConfig:{
        type:'password',
        placeholder:"password",
        id:"password"
        },
      value: '',
      label: 'Password',
      validation: {
        required:true,

        
     }
      },
      
    },
    validLogin:true,

  }
  checkValidity(value, rules, element){
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !=='' && isValid;
      if(!isValid){
      element.errors.push("This field must not be empty")
      }
  }
  if(rules.minLength){
    const minChar = rules.minLength
    isValid = value.length >= rules.minLength && isValid;
    const errorMessage = "Password must be at least " + minChar + " characters long"
    if(!isValid && value.trim()!== ''){
      element.errors.push(errorMessage)
      }
  }
  if(rules.isAlphaNumeric){
    isValid = validator.isAlphanumeric(value) && isValid;
    if(!isValid && value.trim() !== ''){
      element.errors.push("Must only contain letters or numbers(AlphaNumeric)")
    }
  }
  if(rules.isEmail){
    isValid = validator.isEmail(value)  && isValid ;
    if(!isValid && value.trim()!== ''){
      element.errors.push("Must be a Valid Email")
      }
}
    if(rules.confirmPassword){
      isValid = value === this.state.loginForm.password.value && isValid
      if(!isValid && value.trim()!== ''){
      element.errors.push("Passwords Must Match")
      }
    }

    return isValid
  }
  inputChangedHandler = (event, inputIdentifier) =>{
   const updatedCreateForm = {
     ...this.state.loginForm
   };
   const updatedFormElement = {
     ...updatedCreateForm[inputIdentifier]
   };
   updatedFormElement.errors = []
   updatedFormElement.value = event.target.value
   updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, updatedFormElement)
   updatedFormElement.touched = true
   console.log(updatedFormElement)
   updatedCreateForm[inputIdentifier] = updatedFormElement
   let formisValid = true; 
   for(let inputIdentifier in updatedCreateForm){
     formisValid = updatedCreateForm[inputIdentifier].valid && formisValid
   }
   this.setState({loginForm: updatedCreateForm, formisValid });
  }
   
  onSubmit = (props) =>{ 
    props.preventDefault();
    
    const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;
    console.log(email);
    const data = {
      email,
      password
    }
    axios.post('https://solo-chatappapi.herokuapp.com/users/login', data)
    .then((response) => {
      console.log(response.data);
      const token = "Bearer " + response.data.token
      localStorage.setItem('thisToken', token)
      console.log(token)
      window.location.replace("/home")
    })
    .catch( (error) => {
      console.log(error.message);
      this.setState({validLogin: false})
      
    });
   
    
}

render (){
  let invalidLogin = null;
  if(!this.state.validLogin){
    invalidLogin = (
      <p className="invalidLogin">Invalid Username/Password</p>
    )
  }
  
  const formElementsArray = [];
    for(let key in this.state.loginForm){
      formElementsArray.push({
        id: key,
        config:this.state.loginForm[key]
      })

    }
    return (

     <div className="login">
    
         <h1>Login</h1>
         <hr></hr>
     <form  id='myForm'
            className="form"
              >
    {formElementsArray.map(formElement =>(
       <Input
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            label = {formElement.config.label}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            changed = {(event) => this.inputChangedHandler(event, formElement.id )}
            touched= {formElement.config.touched}
            errors = {formElement.config.errors}
       />
     ))}
     {invalidLogin}
     <br />
     <Button variant="primary" type="submit" onClick={this.onSubmit}>
       Login
     </Button>
     
   </form>
   </div>
    );
    }
}
 
 export default LoginForm;