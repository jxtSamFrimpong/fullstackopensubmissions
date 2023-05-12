import { useState, useEffect } from 'react'

import Note from "./components/Note";
import ErrorNotif from './components/ErrorNotif';
import AddedNotif from './components/AddedNootifs';

import noteService from './services/notesService'
import Footer from './components/footer'

const App = (props) => {

  const handleFetch = () => {
    console.log('effect')
    noteService.getAll()
      .then((response) => {
        setNotes(response)
      })
      .catch((reason) => {
        console.log('deason for failure', reason);
        setNotes(reason)
      })
  }

  const postNoteToServer = (new_note) => {
    noteService.create(new_note, [...notes], setAddedNotifMessage, setAddedClass)
      .then((response) => {
        console.log('response returned after posting new note to server', response.data)
        setNotes(response)
      }).catch((reason) => {
        console.log('what went wrong', reason)
      })
  }

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [toggleValue, settoggleValue] = useState(false)
  const [errorNotifMessage, setErrorNotifMessage] = useState(null);
  const [addedNotifMesage, setAddedNotifMessage] = useState(null);
  const [addedClass, setAddedClass] = useState('added');
  console.log('notes inside app before returning to index for rendering', notes);

  useEffect(handleFetch, [])
  console.log('length of notes', notes.length)

  const addNote = (event) => {
    event.preventDefault()
    console.log('form submit button clicked ', event.target)
    console.log('newnote to submit', newNote)
    console.log('all notes before submit', notes)

    let noteToSet = {
      //id: [...notes].pop().id + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    //setNotes(notes.concat(noteToSet))
    postNoteToServer(noteToSet)
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

  const handleNoteToggleValue = (event, id_num, content, importance) => {
    console.log('gonna change some notes toggle value', event.target.value, id_num)
    const new_importance = !importance
    const updated_note = {
      content: content,
      important: new_importance
    }
    noteService.update(id_num, updated_note, [...notes], setErrorNotifMessage, setAddedNotifMessage, setAddedClass)
      .then(
        (response) => {
          console.log('respose inside handleNoteToggleValue', response);
          setNotes(response)
        }
      )
  }

  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <ErrorNotif message={errorNotifMessage} className="error" />
      <AddedNotif addedNotifMesage={addedNotifMesage} addedClass={addedClass} />
      <label>Show Only Important
        <input type="checkbox" checked={toggleValue} onChange={handleTogglevalue} />
      </label>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {noteToShow.map((note) => <Note key={note.id} content={note.content} id_num={note.id} importance={note.important} handler={handleNoteToggleValue} />)}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App