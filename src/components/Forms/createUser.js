import React, {Component, isValidElement} from 'react';
import axios from 'axios';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import styled from 'styled-components'
import Input from '../UI/Input/input.js';
import {Form , Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FaThList } from 'react-icons/fa';

class CreateForm extends Component{
  state = {
    createForm:{
      name:{
        elementType: "input",
        elementConfig:{
          type:'text',
          placeholder:'Your Name',
          id:"name"
        },
        value: '',
        label: 'Name',
        validation: {
           required:true,
           
        },
        valid:false,
        touched: false

      },
      username:{
        elementType: "input",
        elementConfig:{
          type:'text',
          placeholder:'username',
          id:"username"
        },
        value: '',
        label: 'Username',
        validation: {
           required:true,
           uniqueUser: true
        },
        valid:false,
        touched: false
      },
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
          uniqueEmail: true
          
       },
       valid:false,
       errors:[]
       

      },
      birthdate: {
          elementType: "input",
          elementConfig:{
          type:'date',
          id:"date"
        },
        value: '',
        label: 'BirthDate',
        validation: {
          required:true,
          
       },
       valid:false,
       touched: false,
       errors:[]
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
        minLength:8,
        uppercase: true,
        lowercase: true,
        digits: true,

        
     },
     valid:false,
     touched: false,
     errors:[]
      },
      comfirmpassword: {
        elementType: "input",
        elementConfig:{
        type:'password',
        placeholder:"confirm password"
        },
      value: '',
      label: 'Confirm Password',
      validation: {
        required:true,
        confirmPassword: true,
        
     },
     valid:false,
     touched: false,
     errors:[]
      },

    },
    formisValid: false,
    loggedIn : false,
    otherUserNames: [],
    otherEmails: []

  }

  componentDidMount(){
    axios.get('https://solo-chatappapi.herokuapp.com/users/all').then(response =>{
        for(var i= 0; i<response.data.length; i++){
           this.state.otherUserNames.push(response.data[i].username)
           this.state.otherEmails.push(response.data[i].email)
        }
     }).catch(function (error) {
      console.log(error.message);
      
    });

  }
  checkValidity(value, rules, element){
      
    let isValid = true;
    if(element.label === 'Password'){
      var passValid = new PasswordValidator();
      passValid.is().min(rules.minLength);
      passValid.is().max(50);
      passValid.has().uppercase()                              // Must have uppercase letters
      passValid.has().lowercase()                              // Must have lowercase letters
      passValid.has().digits(1) 
    
     const errors = passValid.validate(value, {list:true});
     console.log(errors)
    if(rules.required){
      isValid = value.trim() !=='' && isValid;
      if(!isValid){
      element.errors.push("This field must not be empty")
      }
  }
  if(rules.minLength){
    const minChar = rules.minLength
    isValid = !(errors.indexOf('min') >=0) && isValid;
    const errorMessage = "Password must be at least " + minChar + " characters long"
    if(!isValid && value.trim()!== ''){
      element.errors.push(errorMessage)
      }
  }
  if(rules.uppercase){
    if(isValid){
    isValid = !(errors.indexOf('uppercase') >=0) && isValid;
    if(!isValid && value.trim() !== ''){
      element.errors.push("Must contain an uppercase letter")
    }
  }
  else{
    if(errors.indexOf('uppercase') >=0 && value.trim()!== ''){
      element.errors.push("Must contain an uppercase letter")
    }
  }
}
  if(rules.lowercase){
    if(isValid){
    isValid = !(errors.indexOf('lowercase') >=0) && isValid;
    if(!isValid && value.trim() !== ''){
      element.errors.push("Must contain a lowercase letter")
    }
  }
  else{
    if(errors.indexOf('lowercase') >=0 && value.trim()!== ''){
      element.errors.push("Must contain a lowercase letter")
    }
  }
}
  if(rules.digits){
    if(isValid){
    isValid = !(errors.indexOf('digits') >=0) && isValid;
    if(!isValid && value.trim() !== ''){
      element.errors.push("Must contain at least one digit")
    }
  }
  else{
    if(errors.indexOf('digits') >=0 && value.trim()!== ''){
      element.errors.push("Must contain at least one digit")
    }
  }
  }
}
else{  
  if(rules.required){
    isValid = value.trim() !=='' && isValid;
    if(!isValid){
    element.errors.push("This field must not be empty")
    }
}
  if(rules.isEmail){
    isValid = validator.isEmail(value)  && isValid ;
    if(!isValid && value.trim()!== ''){
      element.errors.push("Must be a Valid Email")
      }
}
    if(rules.confirmPassword){
      isValid = value === this.state.createForm.password.value && isValid
      if(!isValid && value.trim()!== ''){
      element.errors.push("Passwords Must Match")
      }
    }
    if(rules.uniqueUser){
      if(isValid){
      isValid = !this.state.otherUserNames.includes(value) && isValid
      if(!isValid && value.trim()!== ''){
        element.errors.push("Username is already in use")
        }
    }
    else{
      if(value.trim()!== '' && this.state.otherUserNames.includes(value)){
        element.errors.push("Username is already in use")
      }
    }
    }
    if(rules.uniqueEmail){
      if(isValid){
        isValid = !this.state.otherEmails.includes(value) && isValid
        if(!isValid && value.trim()!== ''){
          element.errors.push("Email is already in use")
          }
      }
      else{
        if(value.trim()!== '' && this.state.otherEmails.includes(value)){
          element.errors.push("Email is already in use")
        }
      }
    }


  }
    return isValid
  }
  inputChangedHandler = (event, inputIdentifier) =>{
   const updatedCreateForm = {
     ...this.state.createForm
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
   this.setState({createForm: updatedCreateForm, formisValid });
  }

  onSubmit = (props) =>{ 
    let todayDate = Date.now();
    let newDate = new Date(this.state.createForm.birthdate.value);
    props.preventDefault();
    
    const name = this.state.createForm.name.value;
    const username = this.state.createForm.username.value;
    const birthDate = new Date(this.state.createForm.birthdate.value);
    const age = Math.floor((todayDate - newDate)/(1000*3600*24*365));
    const email = this.state.createForm.email.value;
    const password = this.state.createForm.password.value;
    const online = false;
    console.log(age);
    const data = {
      name,
      username,
      email,
      birthDate,
      password,
      online
    }
    console.log(data)
    axios.post('https://solo-chatappapi.herokuapp.com/users', data)
    .then( (response) => {
      console.log(response.data);
      this.setState({loggedIn: true});
      window.location.replace("/login")
    })
    .catch((error) => {
      console.log(error);
      
    });
  }


  render(){
    const formElementsArray = [];
    for(let key in this.state.createForm){
      formElementsArray.push({
        id: key,
        config:this.state.createForm[key]
      })

    }
    return (
     //    <div className="Person" >
     <div className="register">
         <h1>Registration</h1>
         <hr className="line"></hr>
     <Form id='myForm'
            className="form"
            ref= { form => this.messageForm = form }
            onSubmit={ this.onSubmit.bind( this )}>
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
     
     <Button variant="primary" type="submit" disabled={!this.state.formisValid}>
       Register
     </Button>
     
   </Form>
   </div>
    );
    }
 }
 
 export default CreateForm;