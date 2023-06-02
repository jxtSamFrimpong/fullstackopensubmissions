import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const AddBlog = ({ blogs, setBlogs, token, setErrMessage, setErrClass, blogToggle }) => {
	AddBlog.propTypes = {
		blogs: PropTypes.array.isRequired,
		setBlogs: PropTypes.func.isRequired,
		token: PropTypes.string.isRequired,
		setErrMessage: PropTypes.func.isRequired,
		setErrClass: PropTypes.func.isRequired,
		blogToggle: PropTypes.object.isRequired
	}

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')


	const handler = async (event) => {
		event.preventDefault()
		const payload = {
			url, title, author
		}

		try {
			const addedBlog = await blogService.createBlog(payload, token)
			setBlogs(blogs.concat(addedBlog))
			setErrClass('added')
			setErrMessage(`Added a new Blog, ${title} by ${author} successfuly`)
			blogToggle.current.toggleVisibility()
			setTitle('')
			setAuthor('')
			setUrl('')
		}
		catch (err) {
			console.log(err)
			setErrClass('error')
			setErrMessage(`Couldnt add new blog:\n${err}`)
		}

		setTimeout(() => {
			setErrMessage(null)
		}, 5000)
	}


	return (
		<div>
			<form onSubmit={handler}>
				<div>title: <input type="text" value={title} onChange={(event) => { setTitle(event.target.value) }} /></div>
				<div>author: <input type="text" value={author} onChange={(event) => { setAuthor(event.target.value) }} /></div>
				<div>url: <input type="text" value={url} onChange={(event) => { setUrl(event.target.value) }} /></div>
				<button type="submit">create</button> <div onClick={() => { blogToggle.current.toggleVisibility() }}>cancel</div>
			</form>
		</div>
	)
}

export default AddBlog