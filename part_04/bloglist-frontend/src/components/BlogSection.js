import {useState, useEffect} from 'react'
import Notif from './Notif'
import Logout from './Lougt'
import Blog from './Blog'
import AddBlog from './AddBlog'

const BlogSection=({blogs, setUser, username, setBlogs, token})=>{
  console.log(blogs)
    const [notifMessage, setNotifMesage] = useState(null)
    const [notifClass, setNotifClass] = useState('')

    useEffect(()=>{
      setNotifClass('logged')
      setNotifMesage(`Welcome our dear ${username}`)
    }, [username])
    
    return (
      <div>
        <h2>blogs</h2>
        {notifMessage!==null?
        <Notif message={notifMessage} setMessage={setNotifMesage} className_={notifClass}/>:
        null}
        <div>{username} is logged in
          <Logout setUser={setUser}/>
        </div>
        <div><AddBlog blogs={blogs} setBlogs={setBlogs} token={token} setErrMessage={setNotifMesage} setErrClass={setNotifClass}/></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      )
  }

export default BlogSection