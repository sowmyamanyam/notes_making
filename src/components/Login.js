import React, { useState } from 'react'

import axios from 'axios'

import validator from 'validator'

import swal from 'sweetalert'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const handleEmailChange = (e) => {

        setEmail(e.target.value)

    }
    const handlePasswordChange = (e) => {

        setPassword(e.target.value)

    }
    const runValidations = () => {

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

                email : email,
                password : password

            }
            axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)

            .then((response) => {

                const result = response.data

                if(result.hasOwnProperty('errors')){

                   swal("OOPS!!", result.errors, "error")

                }
                else{

                    swal("Great!", "You are authenticated", "success")

                    window.localStorage.clear()

                    localStorage.setItem('token', result.token)

                    props.history.push('/')

                    props.handleAuth()

                }

            })
            .catch((err) => {

                swal("OOPS!!", err.message, "error")

            })

        }
        else{

                setFormErrors(errors)

            }

        }
    return(

        <div>
            <h2>Please login in to add notes...</h2>
            <form onSubmit = {handleSubmit}>
                <input type = 'text' placeholder = 'Email Address' value = {email} onChange = {handleEmailChange} />
                {formErrors && <span><b>{formErrors.email}</b></span>}<br /><br />
                <input type = 'password' placeholder = 'Password'  value = {password} onChange = {handlePasswordChange}/>
                {formErrors && <span><b>{formErrors.password}</b></span>}<br /><br />
                <input type = 'submit' value = 'Log In' />
            </form>
        </div>

    )

}
export default Login