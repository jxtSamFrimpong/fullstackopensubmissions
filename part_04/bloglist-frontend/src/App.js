import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import './styles/index.css'

import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll(user).then(blogs =>
        setBlogs(blogs)
      )

    }
  }, [user])

  useEffect(() => {
    const loggedInUserJSONstring = window.localStorage.getItem('loggedInUser')
    //console.log('json string logged in user', loggedInUserJSONstring)
    // if (loggedInUserJSONstring) {
    //   const user = JSON.parse(loggedInUserJSONstring)
    //   setUser(user) 
    // }
    try{
      const user = JSON.parse(loggedInUserJSONstring)
      const tryBlogs = blogService.getAll(user)
      if (tryBlogs){
        setUser(user)
      }
    }
    catch(e){
      console.log('authentication error, login again')
    }
  }, [])


  return (
    <div>
      {
        user === null ?
          <LoginForm setUser={setUser} /> :
          <BlogSection blogs={blogs} setUser={setUser} username={user.username} setBlogs={setBlogs} token={user.token} />
      }

    </div>
  )
}

export default App