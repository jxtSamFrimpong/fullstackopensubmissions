import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { createDote } from "../services/requests"
import NotifContext from "../NotifContext"

const AnecdoteForm = () => {
  const [notif, dispatch] = useContext(NotifContext)
  const queryClient = useQueryClient()
  const createDoteMutation = useMutation(createDote, {
    onSuccess: (createdDote)=>{
      // queryClient.invalidateQueries('anecdotes')
      const dotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', dotes.concat(createdDote))
//console.log(createdDote)
      dispatch({type: 'SET', payload: `Anecdote '${createdDote.content}' has been created`})
    setTimeout(()=>{
      dispatch({type: 'SET', payload: ''})
    }, 5000)
    }, 
    onError: (response)=>{
      // console.log(response.response.data.error)
      if (response?.response?.data?.error === "too short anecdote, must have length 5 or more"){
        console.log("too short anecdote, must have length 5 or more")
        dispatch({type: 'SET', payload: `too short anecdote, must have length 5 or more`})
    setTimeout(()=>{
      dispatch({type: 'SET', payload: ''})
    }, 3000)
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    createDoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
