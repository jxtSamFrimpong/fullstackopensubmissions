import { useEffect } from 'react'
import './styles/index.css'

import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import Users from './components/Users'
import IndieUser from './components/IndieUser'
import IndieBlog from './components/IndieBlog'

import blogService from './services/blogs'

import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import {
  Routes,
  Route, 
  Link
} from 'react-router-dom'

import {
  useUsers,
  useBlogs
} from './hooks'


const App = () => {
  // const dispatch = useDispatch()
  // const user = useSelector(({user}) => user)

  // useEffect(() => {
  //   if (user) {
  //     blogService.getAll(user).then(blogsList =>
  //       dispatch(setBlogs(blogsList))
  //     )

  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  // useEffect(() => {
  //   const loggedInUserJSONstring = window.localStorage.getItem('loggedInUser')
    
  //   const tryBlogs = blogService.getAll(JSON.parse(loggedInUserJSONstring))
  //     console.log('tryblogs', tryBlogs)
  //     tryBlogs
  //     .then(response => dispatch(setUser(JSON.parse(loggedInUserJSONstring))))
  //     .catch(err => console.log('authentication error, login again'))
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  useUsers()
  useBlogs()



  return (
    <div>
    <div>
      <Link to='/' className='padded'>Blogs</Link>
      <Link to='/login' className='padded'>Login</Link>
      <Link to='/users' className='padded'>users</Link>
    </div>
    <Routes>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/' element={<BlogSection />}></Route>
      <Route path='/users' element={<Users />}></Route>
      <Route path='/users/:id' element={<IndieUser />}></Route>
      <Route path='/blogs/:id' element={<IndieBlog />}></Route>
    </Routes>

    </div>
  )
}

export default App