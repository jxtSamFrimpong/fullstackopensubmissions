import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"

const Logout=()=>{
	const dispatch = useDispatch()
	const handler =(event)=>{
		event.preventDefault()
		console.log(event.target)
		window.localStorage.removeItem('loggedInUser')
		dispatch(setUser(null))
	}

	return (
		<button onClick={handler}>Logout</button>
		)
}

export default Logout