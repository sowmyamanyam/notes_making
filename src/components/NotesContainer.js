import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddNote from './AddNote'
import NotesList from './NotesList'

const NotesContainer = (props) => {
    
    const [allNotes, setAllNotes] = useState([])

    useEffect(() => {

       axios.get('http://dct-user-auth.herokuapp.com/api/notes', {

            headers : {

                'x-auth' : localStorage.getItem('token')

            }
        
       })
       .then((response) => {

            const result = response.data

            console.log(result)
            setAllNotes(result)

       })
       .catch((err) => {

            alert(err.message)

       })

    }, [])
    const addNote = (notes) => {

        const result = [notes, ...allNotes]

        setAllNotes(result)

    }
    const removeItem = (_id) => {

        const result = allNotes.filter((notes) => {

            return notes._id !== _id

        })

        setAllNotes(result)

    }

    return(
        <div className = 'row'>
            <div className = 'col-md-12'>
                <NotesList allNotes = {allNotes} removeItem = {removeItem}/>
                
            </div>
            <div className = 'col-md-6'>
                
                <AddNote addNote = {addNote}/>
            </div>
         </div>
    )


}
export default NotesContainer