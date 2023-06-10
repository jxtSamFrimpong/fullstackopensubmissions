import { useEffect } from 'react'

//COMPONENTS
import NewNote from './components/NewNote'
import Notes from './components/Notes'

//REDUX
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <Notes  />
    </div>
  )
}

export default App