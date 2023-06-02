import { useState } from 'react'
import Login from '../services/login'
import Notif from './Notif'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser }) => {
  const [userName, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [errMessage, setErrMessage] = useState(null)

  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
  }

  const handleUsername = (event) => {
    //console.log('username',event.target.value)
    setUsername(event.target.value)
  }

  const handlePass = (event) => {
    //console.log('password',event.target.value)
    setPass(event.target.value)
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const username = userName
      const password = pass

      const payload = {
        username, password
      }

      const credentials = await Login(payload)
      //console.log('token in form', credentials.token)
      setUser(credentials)
      setUsername('')
      setPass('')


      window.localStorage.setItem('loggedInUser', JSON.stringify(credentials))
    }
    catch (err) {
      console.log(err)
      setErrMessage(`Wrong username or password, try again`)

      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {errMessage !== null ?
        <Notif message={errMessage} setMessage={setErrMessage} className_={'error'} />
        : null}
      <form onSubmit={handleLogin}>
        <label>Username</label><br />
        <input type="text" value={userName} onChange={handleUsername} /><br />
        <label>Password</label><br />
        <input type="password" value={pass} onChange={handlePass} /><br />
        <button type="submit" >Login</button>
      </form>
    </div>
  )
}

export default LoginForm