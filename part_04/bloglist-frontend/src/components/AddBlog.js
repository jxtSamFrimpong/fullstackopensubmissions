import {useState} from 'react'
import blogService from '../services/blogs'

const AddBlog=({blogs, setBlogs, token, setErrMessage, setErrClass})=>{
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [url, setUrl] = useState('')


const handler=async(event)=>{
	event.preventDefault()
	const payload = {
		url, title, author
	}

	try{
		const addedBlog = await blogService.createBlog(payload, token)
	setBlogs(blogs.concat(addedBlog))
	setErrClass('added')
	setErrMessage(`Added a new Blog, ${title} by ${author} successfuly`)
	}
	catch(err){
		console.log(err)
		setErrClass('error')
		setErrMessage(`Couldnt add new blog:\n${err}`)
	}

	setTimeout(()=>{
		setErrMessage(null)
	}, 5000)
}


	return (
		<div>
		<form onSubmit={handler}>
			<div>title: <input type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}}/></div>
			<div>author: <input type="text" value={author} onChange={(event)=>{setAuthor(event.target.value)}}/></div>
			<div>url: <input type="text" value={url} onChange={(event)=>{setUrl(event.target.value)}}/></div>
			<button type="submit">create</button>
		</form>
		</div>
		)
}

export default AddBlog