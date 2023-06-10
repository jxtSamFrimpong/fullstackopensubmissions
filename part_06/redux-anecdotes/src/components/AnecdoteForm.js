import { useDispatch } from 'react-redux'
import { doteThunk } from '../reducers/anecdoteReducer'
import {  notifThunk } from '../reducers/notificationReducer'
 
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const Dote = (event) => {
        event.preventDefault()
        //console.log(event.target.dote.value)
        const object = { votes: 0, content: event.target.dote.value}

        dispatch(doteThunk(object))

        const notifMessage = `A new note '${event.target.dote.value}' has been created`
        event.target.dote.value = ''
        dispatch(notifThunk(notifMessage))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={Dote}>
                <div><input name='dote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm