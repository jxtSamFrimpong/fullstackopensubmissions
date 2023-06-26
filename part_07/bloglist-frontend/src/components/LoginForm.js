import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotifClass } from '../reducers/notifClass'
import { notifThunk } from '../reducers/notifReducer'
import { setUser } from '../reducers/userReducer'

import Login from '../services/login'
import Notif from './Notif'

import {
  useNavigate
} from 'react-router-dom'

import {
  useUsers,
  useBlogs
} from '../hooks'

const LoginForm = () => {
  useUsers()
  useBlogs()
  const dispatch = useDispatch()
  const notification = useSelector(({notification}) => notification)
  const navigate = useNavigate()

  const [userName, setUsername] = useState('')
  const [pass, setPass] = useState('')

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
      dispatch(setUser(credentials))

      dispatch(setNotifClass('added'))
      dispatch(notifThunk(`Welcome ${credentials.username}`, 5000))
      
      setUsername('')
      setPass('')

      navigate('/')


      window.localStorage.setItem('loggedInUser', JSON.stringify(credentials))
    }
    catch (err) {
      console.log(err)
      // setErrMessage(`Wrong username or password, try again`)
      dispatch(setNotifClass('error'))
      dispatch(notifThunk('Wrong username or password, try again'))
      // setTimeout(() => {
      //   setErrMessage(null)
      // }, 5000)
    }
  }

  return (
    <div>
      {notification !== null && <Notif />}
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