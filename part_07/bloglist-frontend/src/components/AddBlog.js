import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { setNotifClass } from '../reducers/notifClass'
import { notifThunk } from '../reducers/notifReducer'
import { addBlog } from '../reducers/blogReducer'


const AddBlog = ({ blogToggle }) => {
	const dispatch = useDispatch()
	const token = useSelector(({user}) => user.token)

	AddBlog.propTypes = {
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
			
			dispatch(addBlog(addedBlog))
			
			dispatch(setNotifClass('added'))
			dispatch(notifThunk(`Added a new Blog, ${title} by ${author} successfuly`))
			
			blogToggle.current.toggleVisibility()
			setTitle('')
			setAuthor('')
			setUrl('')
		}
		catch (err) {
			console.log(err)
			dispatch(setNotifClass('error'))
			dispatch(notifThunk(`Couldnt add new blog:\n${err}`))
		}
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