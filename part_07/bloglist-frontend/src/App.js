import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import './styles/index.css'

import blogService from './services/blogs'

import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user)

  useEffect(() => {
    if (user) {
      blogService.getAll(user).then(blogsList =>
        dispatch(setBlogs(blogsList))
      )

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    const loggedInUserJSONstring = window.localStorage.getItem('loggedInUser')
    
    const tryBlogs = blogService.getAll(JSON.parse(loggedInUserJSONstring))
      console.log('tryblogs', tryBlogs)
      tryBlogs
      .then(response => dispatch(setUser(JSON.parse(loggedInUserJSONstring))))
      .catch(err => console.log('authentication error, login again'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      {
        user === null ?
          <LoginForm /> :
          <BlogSection />
      }

    </div>
  )
}

export default App