import { useDispatch } from 'react-redux'
// import { addDote } from '../reducers/actionCreators'
import { dote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'
 
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const Dote = (event) => {
        event.preventDefault()
        console.log(event.target.dote.value)
        //dispatch(addDote(event.target.dote.value))
        dispatch(dote(event.target.dote.value))

        const result = dispatch(setNotif(`A new note '${event.target.dote.value}' has been created`))
        console.log(result)
        event.target.dote.value = ''
        setTimeout(()=>{
            dispatch(removeNotif())
        }, 5000)
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