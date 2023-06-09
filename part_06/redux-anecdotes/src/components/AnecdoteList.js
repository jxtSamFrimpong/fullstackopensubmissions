import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/actionCreators'
import { useEffect } from 'react'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes}) => anecdotes)
    const filter = useSelector(({filter})=> filter)
    const dispatch = useDispatch()
    let filteredAnecdoted = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </>)
}

export default AnecdoteList