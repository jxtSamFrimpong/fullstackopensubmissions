import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from "./components/Note";

const App = (props) => {

  const handleFetch = () => {
    console.log('effect')
    axios.get('http://localhost:3001/notes')
      .then((response) => {
        console.log('response data on Success', response.data)
        setNotes(response.data)
      })
      .catch((reason) => {
        console.log('reason for on Failure', reason);
        setNotes([])
      })
  }

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [toggleValue, settoggleValue] = useState(false)
  console.log('notes inside app before returning to index for rendering', notes);

  useEffect(handleFetch, [])
  console.log('length of notes', notes.length)

  const addNote = (event) => {
    event.preventDefault()
    console.log('form submit button clicked ', event.target)
    console.log('newnote to submit', newNote)
    console.log('all notes before submit', notes)

    let noteToSet = {
      id: [...notes].pop().id + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    setNotes(notes.concat(noteToSet))
    setNewNote('')

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleTogglevalue = (event) => {
    console.log(event.target.value)
    //console.log(typeof (event.target.value))
    const newVal = !toggleValue
    console.log(newVal);
    settoggleValue(newVal)
    setShowAll(!newVal)
  }

  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <label>Show Only Important
        <input type="checkbox" checked={toggleValue} onChange={handleTogglevalue} />
      </label>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {noteToShow.map((note) => <Note key={note.id} content={note.content} />)}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App