import { useState, useEffect, useRef } from 'react'

import Note from "./components/Note";
import ErrorNotif from './components/ErrorNotif';
import AddedNotif from './components/AddedNootifs';
import LoginForm from './components/LoginForm';
import WelcomeUser from './components/WelcomeUser';
import Logout from './components/Logout'
//import CancelLogin from './components/CancelLogin';
import GenTogglable from './components/GenTog';
import Togglable from './components/Toglable';
import NoteForm from './components/NoteForm';

import noteService from './services/notesService'
import Footer from './components/footer'
import loginService from './services/login'

//REDUX
//import store from './store';
import { useSelector, useDispatch } from 'react-redux'
import actionCreators from './reducers/actionCreators';

const App = (props) => {

  const dispatch = useDispatch()
  const store = useSelector(state => state)

  const handleFetch = () => {
    console.log('effect')
    noteService.getAll()
      .then((response) => {
        setNotes(response)
        dispatch(actionCreators.allNew(response))
        //console.log('store getstate', store.getState())

      })
      .catch((reason) => {
        console.log('deason for failure', reason);
        setNotes(reason)
        dispatch(actionCreators.allNew(reason))
        //console.log('reason getstate', store.getState())

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

  const noteFormRef = useRef()

  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  //const showWhenVisible = { display: loginVisible ? '' : 'none' }


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
      setLoginVisible(false)
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

  const NoteSection = ({ toggleValue, noteToShow }) => {

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
      noteService.update(id_num, updated_note, store, setErrorNotifMessage, setAddedNotifMessage, setAddedClass)
        .then(
          (response) => {
            console.log('respose inside handleNoteToggleValue', response);
            setNotes(response)
            dispatch(actionCreators.allNew(response))
          }
        )
    }

    return (
      <div>
        <label>Show Only Important
          <input type="checkbox" checked={toggleValue} onChange={handleTogglevalue} />
        </label>
        <ul>
          {noteToShow.map((note) => <Note key={note.id} content={note.content} id_num={note.id} importance={note.important} handler={handleNoteToggleValue} />)}
        </ul>
        <GenTogglable buttonLabel={'new note'} ref={noteFormRef}>
          <NoteForm setAddedNotifMessage={setAddedNotifMessage} setAddedClass={setAddedClass} setNotes={setNotes} noteFormRef={noteFormRef} notes={store} />
        </GenTogglable>
      </div>
    )
  }

  // const noteToShow = showAll
  //   ? notes
  //   : notes.filter((note) => note.important)
  const noteToShow = showAll
    ? store
    : store.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <ErrorNotif message={errorNotifMessage} className="error" />
      <AddedNotif addedNotifMesage={addedNotifMesage} addedClass={addedClass} />
      {user === null ?
        null :
        <WelcomeUser addedNotifMesage={`Welcome ${user.username}`} addedClass={'added'} />}
      <Togglable buttonLabel='re-login' visible={loginVisible} setVisible={setLoginVisible} user={user}>
        {<div>
          <LoginForm handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword} />
        </div>}
      </Togglable>
      {/* {(user === null) || loginVisible ?
        <div style={showWhenVisible}>
          <LoginForm handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword} />
        </div> */}
      {(user === null) || loginVisible ? null
        : <div style={hideWhenVisible}>
          <NoteSection toggleValue={toggleValue}
            noteToShow={noteToShow}
          />
        </div>
      }
      <span>
        {
          (user !== null) && !loginVisible ?
            <Logout setUser={setUser} setLoginVisible={setLoginVisible} />
            : null
        }
        {/* {
          <div style={showWhenVisible}><CancelLogin setLoginVisible={setLoginVisible} /></div>
        } */}
      </span>
      <Footer />
    </div>
  )
}

export default App