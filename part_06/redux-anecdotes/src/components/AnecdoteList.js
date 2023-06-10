import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/actionCreators'
import { useEffect } from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdote}) => anecdote)
    const filter = useSelector(({filter})=> filter)
    const dispatch = useDispatch()
    
    let filteredAnecdoted = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const voteUp = (id) => {
        console.log('vote', id)
        // dispatch(addVote(id))
        dispatch(vote(id))

        const content = anecdotes.find(anecdote => anecdote.id === id)
        console.log(content)
        dispatch(setNotif(`The note '${content.content}' has been upvoted`))
        setTimeout(()=>{
            dispatch(removeNotif())
        }, 5000)
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        filteredAnecdoted = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }, [filter])

    return (<>
        {filteredAnecdoted.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteUp(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </>)
}

export default AnecdoteList