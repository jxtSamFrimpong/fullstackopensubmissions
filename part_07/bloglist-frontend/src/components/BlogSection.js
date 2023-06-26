import { useState, useEffect, useRef } from 'react'
//import Notif from './Notif'
//import Logout from './Lougt'
import Blog from './Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'
import BlogsHeader from './BlogsHeader'

import { useSelector, useDispatch } from 'react-redux'
import { setNotifClass } from '../reducers/notifClass'
import { notifThunk } from '../reducers/notifReducer'
import { ascSort, dscSort } from '../reducers/blogReducer'

import {
  Navigate
} from 'react-router-dom'

import {
  useUsers,
  useBlogs
} from '../hooks'

const BlogSection = () => {
  useUsers()
  useBlogs()
  const dispatch = useDispatch()
  //const notification = useSelector(({notification})=> notification)
  const user = useSelector(({user})=>user)
  const blogs = useSelector(({blogs})=> blogs)
  const username = useSelector(({user}) => user?.username)
  // const navigate = useNavigate()

  console.log(blogs)
  const [sortBlogsDSC, setSortBlogDSC] = useState(false)
  const [sortBlogsASC, setSortBlogASC] = useState(false)
  const blogToggle = useRef()

  useEffect(() => {
    dispatch(setNotifClass('logged'))
    dispatch(notifThunk(`Welcome our dear ${username}`))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(() => {
    //setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
    dispatch(dscSort())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBlogsDSC])

  useEffect(() => {
    //setBlogs([...blogs].sort((a, b) => a.likes - b.likes))
    dispatch(ascSort())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBlogsASC])


  const SortSelect = () => {
    return (
      <div>
        <button onClick={() => { setSortBlogDSC(true) }}>Sort DSC</button>
        <button onClick={() => { setSortBlogASC(true) }}>Sort ASC</button>

      </div>
    )
  }

  return (
    user !== null?
      <div>
      {/* <h2>blogs</h2>
      {notification !== null ?
        <Notif /> :
        null}
      <div>{username} is logged in
        <Logout />
      </div> */}
      <BlogsHeader />
      <Togglable buttonLabel={'new blog'} ref={blogToggle}>
        <AddBlog blogToggle={blogToggle} />
      </Togglable>
      <SortSelect />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>:
    <Navigate replace to={'/login'} />
  )
}

export default BlogSection