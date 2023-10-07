/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SingUpPage from './pages/HomePage'
import LogoutPage from './pages/LogoutPage'
import { setLoggedIn } from './reducers/loggedInReducer'
import { setUser } from './reducers/userReducer'

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const loggedIn = sessionStorage.getItem("loggedIn");
  //   const user = sessionStorage.getItem("user");
  //   dispatch(setLoggedIn(loggedIn === undefined ? false : loggedIn));
  //   dispatch(setUser(user === undefined ? null : user));
  // }, [])

  return (
    <>
      <div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/join'>Sign Up</Link>
          <Link to='/logout'>Log Out</Link>
        </div>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/join' element={<SingUpPage />}></Route>
          <Route path='/logout' element={<LogoutPage />}></Route>
        </Routes>

      </div>
    </>
  )
}

export default App
