import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const RadioRow = () => {
    const dispatch = useDispatch()

    const handleSelect = (event) => {
        //event.preventDefault()
        // console.log(event.target.id)
        dispatch(filterChange(event.target.id))

    }
    return (
        <fieldset>
            <legend>Select the kind of notes to show:</legend>
            <div>
                <input type="radio" id="ALL" name="filter" onChange={handleSelect} />
                <label htmlFor="ALL">all</label>

                <input type="radio" id="IMPORTANT" name="filter" onChange={handleSelect} />
                <label htmlFor="IMPORTANT">important</label>

                <input type="radio" id="NONEIMPORTANT" name="filter" onChange={handleSelect} />
                <label htmlFor="NONEIMPORTANT">none-important</label>
            </div>
        </fieldset>

    )
}

export default RadioRow