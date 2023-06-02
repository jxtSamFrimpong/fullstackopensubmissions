import { useState, useEffect, useRef } from 'react'
import Notif from './Notif'
import Logout from './Lougt'
import Blog from './Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'

const BlogSection = ({ blogs, setUser, username, setBlogs, token }) => {
  console.log(blogs)
  const [notifMessage, setNotifMesage] = useState(null)
  const [notifClass, setNotifClass] = useState('')
  const [sortBlogsDSC, setSortBlogDSC] = useState(false)
  const [sortBlogsASC, setSortBlogASC] = useState(false)
  const blogToggle = useRef()

  useEffect(() => {
    setNotifClass('logged')
    setNotifMesage(`Welcome our dear ${username}`)
  }, [username])

  useEffect(() => {
    setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBlogsDSC])

  useEffect(() => {
    setBlogs([...blogs].sort((a, b) => a.likes - b.likes))
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
    <div>
      <h2>blogs</h2>
      {notifMessage !== null ?
        <Notif message={notifMessage} setMessage={setNotifMesage} className_={notifClass} /> :
        null}
      <div>{username} is logged in
        <Logout setUser={setUser} />
      </div>
      <Togglable buttonLabel={'new blog'} blogs={blogs} ref={blogToggle}>
        <AddBlog blogs={blogs} setBlogs={setBlogs} token={token} setErrMessage={setNotifMesage} setErrClass={setNotifClass} blogToggle={blogToggle} />
      </Togglable>
      <SortSelect />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} token={token} setBlogs={setBlogs} allBlogs={blogs} />
      )}
    </div>
  )
}

export default BlogSection