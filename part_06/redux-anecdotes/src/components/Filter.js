import { useDispatch } from 'react-redux'
// import {filterChange} from '../reducers/filterReducer'
import {set} from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    //const filter = useSelector(({filter})=> filter)
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      //console.log(event.target.value)
      //dispatch(filterChange(event.target.value))
      dispatch(set(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter