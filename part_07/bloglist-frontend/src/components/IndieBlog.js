import { useState } from 'react'
import BlogsHeader from "./BlogsHeader";
import { 
    useSelector,
    useDispatch 
} from 'react-redux'
import { 
    useQuery
} from "react-query"
import { getUsers } from '../services/users';
import {
    useParams,
    Link
} from 'react-router-dom'

import {
    useUsers,
    useBlogs
} from '../hooks'
import blogservices from '../services/blogs'
import { upvoteBlog, commentBlog } from "../reducers/blogReducer";
import { notifThunk } from "../reducers/notifReducer";
import { setNotifClass } from "../reducers/notifClass";

const IndieBlog = ()=>{
    useUsers()
    useBlogs()
    const id = useParams().id
    const dispatch = useDispatch()
    const blog = useSelector(({blogs}) => blogs.find(blog => blog.id === id))
    const token = useSelector(({user}) => user?.token)

    const [comment, setComment] = useState('')


    const likeHandler = async (id, like) => {
        console.log('before likes', like)
        const data = {
          likes: Number(like) + 1
        }
        try {
          const response = await blogservices.MoreLikes(id, data, token)
          dispatch(upvoteBlog(response))
    
          dispatch(setNotifClass('fret'))
          dispatch(notifThunk(`blog ${id} has been upvoted`))
        } catch (err) {
          console.log('handle err', err)
          
          dispatch(setNotifClass('error'))
          dispatch(notifThunk(`error upvoting blog ${id}`))
        }
    
      }
    
    const commentHandler = (id)=>{
        console.log('comment id', id);
        dispatch(commentBlog({
            id,
            comment
        }))
        setComment('')
    }


    return (
        blog?
        <>
            <BlogsHeader />
            <h2>{blog.title}</h2>
            <p>
                <a href={blog.url}>{blog.url}</a>
                <br />
                <span>{blog.likes} likes <button onClick={() => { likeHandler(blog.id, blog.likes) }} className="like-button">like</button></span>
                <br />
                <span>added by {blog.author}</span>
            </p>
            <div>
                <h2>Comments</h2>
                <span>
                    <form onSubmit={(event)=>{
                        event.preventDefault()
                        commentHandler(blog.id)
                        }}>
                    <input type="text" value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
                    <button type="submit">add comment</button>
                    </form>
                </span>
                <ul>
                    {
                        blog.comments ?
                        blog.comments.map(
                            (comment, index) => <li key={index}>{comment}</li>
                            ):
                            <></>
                    }
                </ul>
            </div>
        </>
        : <></>
    )
}

export default IndieBlog