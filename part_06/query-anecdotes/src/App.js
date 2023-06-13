import { useContext } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getDotes, updateDote } from './services/requests'
import NotifContext from "./NotifContext"

const App = () => {
const [notif, dispatch] = useContext(NotifContext)
  const queryClient = useQueryClient()
  const updateDoteMutation = useMutation(updateDote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateDoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({type: 'SET', payload: `Anecdote '${anecdote.id}' has been upvoted`})
    setTimeout(()=>{
      dispatch({type: 'SET', payload: ''})
    }, 5000)
  }
  const results = useQuery('anecdotes', getDotes, {retry: 1})
  
  if ( results.isLoading ) {
    return <div>loading data...</div>
  }
  if (results.isError){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = results.data
  return (
      <div>
        <h3>Anecdote app</h3>
      
        {
          notif !== ''?
          <Notification />
          : null
        }
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default App
