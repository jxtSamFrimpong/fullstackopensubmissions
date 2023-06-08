import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Header from './components/Header'

const App = () => {

  return (
    <div>
      <Header />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App