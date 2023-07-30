import {
  useState,
  useEffect
} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
  useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote, vote }) => {
  //const id = useParams().id
  //const anecdote = anecdotes.find(dote => dote.id === Number(id))

  return (
    <article>
      <h3>{anecdote.content}</h3>
      <p><em>By: {anecdote.author}</em></p>
      <span>source: {anecdote.info}</span>
      <p><label>votes: <button onClick={() => { vote(anecdote.id) }}>{
        anecdote.votes}
      </button>
      </label>
      </p>
    </article>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const navigate = useNavigate()
  const { reset: resetContent, ...contentField } = useField('text', 'content')
  const { reset: resetAuthor, ...authorField } = useField('text', 'author')
  const { reset: resetInfo, ...infoField } = useField('text', 'info')


  const handleSubmit = (e) => {
    e.preventDefault()
    const id = props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
    props.notify(`a new anecdoted added: ${contentField.value}`)
    navigate(`/anecdotes/${id}`)
  }

  const reset = (event) => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <span>
          <button type='submit'>create</button>
          <button type='button' onClick={reset}>reset</button>
        </span>
      </form>
    </div>
  )

}

const Notification = ({ message }) => {

  //const style = {}

  return message === null ? null :
    <p>{message}</p>
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    return anecdote.id
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    notify(`The anecdote: ${anecdote.content} has been upvoted`)
  }

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const specificDoteUrlCalled = useMatch('/anecdotes/:id')
  const specificDote = specificDoteUrlCalled ?
    anecdotes.find(dote => dote.id === Number(specificDoteUrlCalled.params.id)) :
    null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew notify={notify} addNew={addNew} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={specificDote} vote={vote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
