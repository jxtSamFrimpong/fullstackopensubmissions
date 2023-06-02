import { useState } from "react"
import blogservices from "../services/blogs"
import PropTypes from 'prop-types'

const Blog = ({ blog, token, setBlogs, allBlogs }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    setBlogs: PropTypes.func.isRequired,
    allBlogs: PropTypes.array.isRequired
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeStyle = {
    'backgroundColor': 'lightblue'
  }
  const [viewDetails, setViewDetails] = useState(false)

  const likeHandler = async (id, like) => {
    console.log('before likes', like)
    const data = {
      likes: Number(like) + 1
    }
    try {
      const response = await blogservices.MoreLikes(id, data, token)
      console.log(response.id)
      setBlogs(
        [...allBlogs].map(b => b.id !== response.id ? b : response)
      )
    } catch (err) {
      console.log('handle err', err)
    }

  }

  const removeHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      console.log('go ahead and delete', id)
      try {
        const response = await blogservices.DelBlog(id, token);
        if (response === 204) {
          console.log('success')
          setBlogs([...allBlogs].filter(b => b.id !== id))
        } else {
          console.log('problem')
        }
      } catch (err) {
        console.log('error deleting', err)
      }
    } else {
      console.log('decidedd not to delete again')
    }
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title}  {!viewDetails ? <strong>{blog.author}</strong> : null} <button
        onClick={() => { setViewDetails(!viewDetails) }}>{!viewDetails ? 'view' : 'hide'}</button>
      </span>
      {
        viewDetails ?
          <div>
            <a href={blog.url}>{blog.url}</a>
            <div>likes {blog.likes} <button onClick={() => { likeHandler(blog.id, blog.likes) }}>like</button></div>
            <div>{blog.author}</div>
            <button onClick={() => { removeHandler(blog.id) }} style={removeStyle}>remove</button>
          </div>
          : null
      }
    </div>
  )
}

export default Blog