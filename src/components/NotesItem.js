import React, { useState } from 'react'

import axios from 'axios'

import swal from 'sweetalert'

const NotesItem = (props) => {

    const { _id, title, body, removeItem } = props

    const handleRemove = (_id) => {

        const confirmRemove = window.confirm('Are you sure')

        if(confirmRemove){

            axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, 
            
                {headers : {

                    'x-auth' : localStorage.getItem('token')

                }}
            
            )
            .then((response) => {

                const result = response.data

                console.log(result)

                removeItem(result._id)

            })
            .catch((err) => {

                alert(err.message)

            })

        }

    }
    const handleAlert = () => {

        swal(title, body)

    }
    return(

        <div className = 'col-md-8'>
            <div className = 'card-bg-light'>
                <div className = 'card-header'><h3>{title}</h3></div>
                    <div className = 'card-body'>
                        <div className = 'card-title'><p><i>{body}</i></p></div>
                        <button onClick = {() => {handleRemove(_id)}} className = 'btn btn-success'>Remove
                        </button>   <button className = 'btn btn-primary' onClick = {() => handleAlert()}>Show</button>
                     </div>
                 </div>

            </div>
    )

}
export default NotesItem