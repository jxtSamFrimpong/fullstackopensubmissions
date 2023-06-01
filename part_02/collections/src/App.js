import { useState, useEffect } from 'react'

import Note from "./components/Note";
import ErrorNotif from './components/ErrorNotif';
import AddedNotif from './components/AddedNootifs';
import LoginForm from './components/LoginForm';
import WelcomeUser from './components/WelcomeUser';
import Logout from './components/Logout'

import noteService from './services/notesService'
import Footer from './components/footer'
import loginService from './services/login'

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

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [toggleValue, settoggleValue] = useState(false)
  const [errorNotifMessage, setErrorNotifMessage] = useState(null);
  const [addedNotifMesage, setAddedNotifMessage] = useState(null);
  const [addedClass, setAddedClass] = useState('added');
  console.log('notes inside app before returning to index for rendering', notes);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedInUserJSONstring = window.localStorage.getItem('loggedInUser')
    //console.log('json string logged in user', loggedInUserJSONstring)
    if (loggedInUserJSONstring) {
      const user = JSON.parse(loggedInUserJSONstring)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  useEffect(handleFetch, [user])
  //console.log('length of notes', notes.length)


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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // handleFetch()
    } catch (exception) {
      console.log(exception)
      setAddedClass('error')
      setErrorNotifMessage('Wrong credentials')
      setTimeout(() => {
        setErrorNotifMessage(null)
      }, 5000)
    }
  }

  const NoteForm = () => {
    const [newNote, setNewNote] = useState(
      'a new note...'
    )
    const postNoteToServer = (new_note) => {
      noteService.create(new_note, [...notes], setAddedNotifMessage, setAddedClass)
        .then((response) => {
          console.log('response returned after posting new note to server', response)
          setNotes(response)
        }).catch((reason) => {
          console.log('what went wrong', reason)
        })
    }

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

    return (
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    )
  }
  const NoteSection = ({ toggleValue, handleTogglevalue, handleNoteToggleValue, noteToShow }) => {
    // setAddedClass('added')
    // setAddedNotifMessage()

    return (
      <div>
        <label>Show Only Important
          <input type="checkbox" checked={toggleValue} onChange={handleTogglevalue} />
        </label>
        <ul>
          {noteToShow.map((note) => <Note key={note.id} content={note.content} id_num={note.id} importance={note.important} handler={handleNoteToggleValue} />)}
        </ul>
        <NoteForm />
      </div>
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
      {user === null ?
        null :
        <WelcomeUser addedNotifMesage={`Welcome ${user.username}`} addedClass={'added'} />}
      {user === null ?
        <LoginForm handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} />
        : <NoteSection toggleValue={toggleValue}
          handleTogglevalue={handleTogglevalue}
          handleNoteToggleValue={handleNoteToggleValue}
          noteToShow={noteToShow}
        />}
        {
          user !== null?
          <Logout setUser={setUser}/>
          : null
        }
      <Footer />
    </div>
  )
}

export default App