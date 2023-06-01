const Logout = ({setUser})=>{

const logoutHandler = (event)=>{
	event.preventDefault()
	window.localStorage.removeItem('loggedInUser')
	setUser(null)
	console.log('lougt')
}

	return (
		<div>
		<button onClick={logoutHandler}>Logout</button>
		</div>
		)
}

export default Logout