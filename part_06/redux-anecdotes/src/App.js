import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Header from './components/Header'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <Header />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App