const Logout=({setUser})=>{
	const handler =(event)=>{
		event.preventDefault()
		console.log(event.target)
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
	}

	return (
		<button onClick={handler}>Logout</button>
		)
}

export default Logout