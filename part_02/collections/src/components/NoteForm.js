import { useState } from "react"
import noteService from "../services/notesService"

//REDUX
// import store from '../store';
import { useSelector, useDispatch } from 'react-redux'
import actionCreators from "../reducers/actionCreators";

const NoteForm = ({ setAddedNotifMessage, setAddedClass, setNotes, noteFormRef, notes }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const postNoteToServer = (new_note) => {
        noteService.create(new_note, store, setAddedNotifMessage, setAddedClass)
            .then((response) => {
                console.log('response returned after posting new note to server', response)
                // setNotes(response)
                dispatch(actionCreators.allNew(response))
            }).catch((reason) => {
                console.log('what went wrong', reason)
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        noteFormRef.current.toggleVisibility()
        console.log('form submit button clicked ', event.target)
        console.log('newnote to submit', newNote)
        console.log('all notes before submit', notes)

        let noteToSet = {
            //id: [...notes].pop().id + 1,
            content: newNote,
            important: true
        }
        //setNotes(notes.concat(noteToSet))
        postNoteToServer(noteToSet)
        setNewNote('')

    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h2>create a new note</h2>
            <form onSubmit={addNote}>
                <input
                    id='create-new-note-text-field'
                    type="text"
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default NoteForm