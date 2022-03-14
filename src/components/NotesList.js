import React from 'react'

import NotesItem from './NotesItem'

const NotesList = (props) => {

    const { allNotes, removeItem } = props

    return(

        <div>
            {/* <h2><i>Pen it down here and just relax.. we will save it for you..</i></h2> */}
            {allNotes.length === 0 ? (<div>

                <h2>No Notes found</h2>
                <p>Please add a new note...</p>

            </div>) : (<div>
                <h2>My Notes ({allNotes.length})</h2>
                {allNotes.map((notes) =>{

                return <NotesItem key = {notes._id} {...notes} removeItem = {removeItem}/>

            })}</div>)}
        </div>

    )

}
export default NotesList