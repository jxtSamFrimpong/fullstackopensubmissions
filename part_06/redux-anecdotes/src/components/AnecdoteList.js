import { useEffect } from 'react'

//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { voteThunk, setAllThunk } from '../reducers/anecdoteReducer'
import {  notifThunk } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdote}) => anecdote)
    const filter = useSelector(({filter})=> filter)
    const dispatch = useDispatch()
    
    let filteredAnecdoted = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const voteUp = (body) => {
        
        dispatch(voteThunk(body))

        const content = anecdotes.find(anecdote => anecdote.id === body.id)
        const notifMessage = `The note '${content.content}' has been upvoted`
        dispatch(notifThunk(notifMessage,5000))
        
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        filteredAnecdoted = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }, [filter])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        dispatch(setAllThunk())
        
    }, [dispatch])

    return (<>
        {filteredAnecdoted.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteUp(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </>)
}

export default AnecdoteList