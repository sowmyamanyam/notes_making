import React, { useState } from 'react'

const NotesForm = (props) => {

    const { formSubmission } = props

    const [title, setTitle] = useState('')

    const [body, setBody] = useState('')

    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const runValidation = () => {

        if(title.trim().length === 0){

            errors.title = 'Title cannot be blank'

        }

    }
    const handleTitleChange = (e) => {

        setTitle(e.target.value)

    }
    const handleBodyChange = (e) => {

        setBody(e.target.value)

    }
    const handleSubmit = (e) => {

        e.preventDefault()

        runValidation()

        if(Object.keys(errors).length === 0){

            setFormErrors({})

            const formData = {

                title : title,
                body : body
            
            }
            formSubmission(formData)
            setTitle('')
            setBody('')

        }else{

            setFormErrors(errors)

        }

    }
    return(

        <div>
            <form onSubmit = {handleSubmit}>
                <input type = 'text' value = {title} placeholder = 'Enter title' onChange = {handleTitleChange}/>
                {formErrors && <span>{formErrors.title}</span>}<br /><br />
                <textarea value = {body} placeholder = 'Enter notes' onChange = {handleBodyChange}></textarea><br /><br />
                <input type = 'submit' value = 'Add Note'/>
            </form>
        </div>

    )

}

export default NotesForm