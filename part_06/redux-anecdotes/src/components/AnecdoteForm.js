import { useDispatch } from 'react-redux'
import { addDote } from '../reducers/actionCreators'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const Dote = (event) => {
        event.preventDefault()
        console.log(event.target.dote.value)
        dispatch(addDote(event.target.dote.value))
        event.target.dote.value = ''
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