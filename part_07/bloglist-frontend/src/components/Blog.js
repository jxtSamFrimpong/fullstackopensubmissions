import { useState } from "react"
import blogservices from "../services/blogs"
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from "react-redux"
import { setNotifClass } from '../reducers/notifClass'
import { notifThunk } from '../reducers/notifReducer'
import {upvoteBlog, removeBlog} from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const token = useSelector(({user})=>user.token)
  
  Blog.propTypes = {
    blog: PropTypes.object.isRequired
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
      //console.log(response.id)
      // setBlogs(
      //   [...allBlogs].map(b => b.id !== response.id ? b : response)
      // )
      dispatch(upvoteBlog(response))

      dispatch(setNotifClass('fret'))
      dispatch(notifThunk(`blog ${id} has been upvoted`))
    } catch (err) {
      console.log('handle err', err)
      
      dispatch(setNotifClass('error'))
      dispatch(notifThunk(`error upvoting blog ${id}`))
    }

  }

  const removeHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      console.log('go ahead and delete', id)
      try {
        const response = await blogservices.DelBlog(id, token);
        if (response === 204) {
          console.log('success')
          // setBlogs([...allBlogs].filter(b => b.id !== id))
          dispatch(removeBlog(id))

          dispatch(setNotifClass('remm'))
          dispatch(notifThunk(`blog ${id} has been removed`))
        } else {
          console.log('problem')

          dispatch(setNotifClass('error'))
          dispatch(notifThunk(`error: blog ${id} couldn't be removed`))
        }
      } catch (err) {
        console.log('error deleting', err)

        dispatch(setNotifClass('error'))
        dispatch(notifThunk(`error: blog ${id} couldn't be removed`))
      }
    } else {
      console.log('decidedd not to delete again')
    }
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title}  {!viewDetails ? <strong className="strong-author">{blog.author}</strong> : null} <button
        onClick={() => { setViewDetails(!viewDetails) }}>{!viewDetails ? 'view' : 'hide'}</button>
      </span>
      {
        viewDetails ?
          <div>
            <a href={blog.url}>{blog.url}</a>
            <div>likes {blog.likes} <button onClick={() => { likeHandler(blog.id, blog.likes) }} className="like-button">like</button></div>
            <div className="div-author">{blog.author}</div>
            <button onClick={() => { removeHandler(blog.id) }} style={removeStyle}>remove</button>
          </div>
          : null
      }
    </div>
  )
}

export default Blog