import React, { useState } from 'react'

import axios from 'axios'

import validator from 'validator'

import swal from 'sweetalert'

const Register = (props) => {

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleUserNameChange = (e) => {

        setUserName(e.target.value)

    }
    const handleEmailChange = (e) => {

        setEmail(e.target.value)

    }
    const handlePasswordChange = (e) => {

        setPassword(e.target.value)

    }
    const runValidations = () => {

        if(username.trim().length === 0){

            errors.username = 'First name cannot be blank'

        }
        if(email.trim().length === 0){

            errors.email = 'Email cannot be blank'

        }else if(!validator.isEmail(email)){

            errors.email = 'Invalid Email'

        }
        if(password.trim().length === 0){

            errors.password = 'Password cannot be blank'

        }

    }
    const handleSubmit = (e) => {

        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){

            setFormErrors({})

            const formData = {

                username : username,
                email : email,
                password : password
    
            }
            axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
            
            .then((response) => {
    
                const result = response.data
    
                if(result.hasOwnProperty('errors')){

                    swal('OOPS!', result.message, 'error')

                }
                else{

                    swal('Congratulations..Your account is active!', 'Please wait to be redirected to login...', 'success')

                    console.log(result)

                    props.history.push('/login')

                }
    
            })
            .catch((err) => {
    
                swal('OOPS!', err.message, 'error')
    
            })

        }else{

            setFormErrors(errors)

        }

    }
    return(

        <div>

            <h2>Sign Up</h2>
            <form onSubmit = {handleSubmit}>
               <input type = 'text' placeholder = "User Name" value = {username} onChange = {handleUserNameChange}/>
               {formErrors && <span><b>{formErrors.username}</b></span>}<br /><br />
               <input type = 'email' placeholder = 'Email' value = {email} onChange = {handleEmailChange} />
               {formErrors && <span><b>{formErrors.email}</b></span>}<br /><br />
               <input type = 'password' placeholder = 'Password' value = {password} onChange = {handlePasswordChange}/>
               {formErrors && <span><b>{formErrors.password}</b></span>}<br /><br />
               <input type = 'submit' value = 'Sign Up' />
            </form>

        </div>

    )

}
export default Register