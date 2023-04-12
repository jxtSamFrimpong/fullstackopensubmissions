import { useState } from 'react'

import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  console.log('notes inside app before returning to index for rendering', notes);

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

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {notes.map((note) => <Note key={note.id} content={note.content} />)}
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