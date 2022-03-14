import React from 'react'
import axios from 'axios'
import NotesForm from './NotesForm'

const AddNote = (props) => {

    const { addNote } = props

    const formSubmission = (formData) => {

        axios.post('http://dct-user-auth.herokuapp.com/api/notes', formData, {

            headers : {

                'x-auth' : localStorage.getItem('token')

            }

        })
        .then((response) => {

            const result = response.data

            console.log(result)

            addNote(result)

        })
        .catch((err) => {

            alert(err.message)

        })
    }
    return(

        <div className = 'container'>
            <h2>Add here</h2>
            <NotesForm formSubmission = {formSubmission}/>
        </div>

    )

}
export default AddNote