import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Header from './components/Header'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Header />
      <Filter />
      <AnecdoteList />
      <Notification />
      <AnecdoteForm />
    </div>
  )
}

export default App