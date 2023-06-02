const Logout = ({ setUser, setLoginVisible }) => {

	const logoutHandler = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
		console.log('lougt')
		setLoginVisible(true)
	}

	return (
		<div>
			<button onClick={logoutHandler}>Logout</button>
		</div>
	)
}

export default Logout