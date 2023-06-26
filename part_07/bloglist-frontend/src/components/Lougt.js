import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const Logout=()=>{
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const handler =(event)=>{
		event.preventDefault()
		console.log(event.target)
		window.localStorage.removeItem('loggedInUser')
		dispatch(setUser(null))
		navigate('/')
	}

	return (
		<button onClick={handler}>Logout</button>
		)
}

export default Logout