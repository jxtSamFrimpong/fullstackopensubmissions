import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import RadioRow from './RadioRow'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = async(event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <RadioRow />
    </div>
  )
}

export default NewNote