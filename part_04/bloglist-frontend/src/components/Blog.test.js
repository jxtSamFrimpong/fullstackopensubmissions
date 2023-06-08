import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { expect, jest } from '@jest/globals'

import Blog from './Blog'

// test('<NoteForm /> updates parent state and calls onSubmit', async () => {
//     const createNote = jest.fn()
//     const user = userEvent.setup()

//     render(<NoteForm createNote={createNote} />)

//     const input = screen.getAllByRole('textbox')
//     const contentBox = screen.getByPlaceholderText('write note content here')
//     const sendButton = screen.getByText('save')

//     await user.type(contentBox, 'testing a form...')
//     await user.type(input[1], 'testing a form... again')
//     await user.click(sendButton)

//     expect(createNote.mock.calls).toHaveLength(1)
//     expect(createNote.mock.calls[0][0].content).toBe('testing a form...')

//     const { container } = render(<NoteForm createNote={createNote} />)
//     // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
//     const input2 = container.querySelector('#note-input')
// })

test("component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default", async () => {
    const blog = {
        title: 'For whom things did not change',
        author: 'Ama Ata Aidoo',
        likes: 2,
        url: 'https://freduagyeman.blogspot.com/2014/01/59-no-sweetness-here-and-other-stories.html#:~:text=For%20Whom%20Things%20Did%20Not,the%20ordinary%20people%20%2D%20the%20masses.'
    }
    const token = ''
    const setBlogs = jest.fn()
    const allBlogs = [{ ...blog }]

    render(<Blog blog={blog} token={token} setBlogs={setBlogs} allBlogs={allBlogs} />)

    const titleText = screen.getByText(`${blog.title}`, { exact: false })
    // eslint-disable-next-line testing-library/no-node-access
    const authorTextStrong = document.querySelector('.strong-author')//screen(`${blog.author}`, { exact: false })
    // eslint-disable-next-line testing-library/no-node-access
    const authorTextDiv = document.querySelector('.div-author')
    const likes = screen.queryByText('likes')
    const remove = screen.queryByText('remove')

    expect(titleText).toBeDefined()
    expect(authorTextStrong).toBeDefined()
    expect(authorTextDiv).toBeNull()
    expect(likes).toBeNull()
    expect(remove).toBeNull()
})

test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const blog = {
        title: 'For whom things did not change',
        author: 'Ama Ata Aidoo',
        likes: 2,
        url: 'https://freduagyeman.blogspot.com/2014/01/59-no-sweetness-here-and-other-stories.html#:~:text=For%20Whom%20Things%20Did%20Not,the%20ordinary%20people%20%2D%20the%20masses.'
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrd2Fua3dhYWhpYSIsImlkIjoiNjQ3MjRiOWYxZDMyYTViYjlhMjRhYmRjIiwiaWF0IjoxNjg1ODE4MjYxLCJleHAiOjE2ODU4MTk0NjF9.chh41VHN2QtPJRJQgA2NavFa4ZP_TpOLaF1AN_-ykSU'
    const setBlogs = jest.fn()
    const allBlogs = [{ ...blog }]

    const user = userEvent.default.setup()

    render(<Blog blog={blog} token={token} setBlogs={setBlogs} allBlogs={allBlogs} />)

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const titleText = screen.getByText(`${blog.title}`, { exact: false })
    // eslint-disable-next-line testing-library/no-node-access
    const authorTextStrong = document.querySelector('.strong-author')//screen(`${blog.author}`, { exact: false })
    // eslint-disable-next-line testing-library/no-node-access
    const authorTextDiv = document.querySelector('.div-author')
    const likes = screen.queryByText('likes')
    const remove = screen.queryByText('remove')

    expect(titleText).toBeDefined()
    expect(authorTextStrong).toBeNull()
    expect(authorTextDiv).toBeDefined()
    expect(likes).toBeDefined()
    expect(remove).toBeDefined()

    // // eslint-disable-next-line testing-library/no-node-access
    // const likeButton = document.querySelector('.like-button')

    // await user.click(likeButton)
    // await user.click(likeButton)

    // expect(setBlogs.mock.calls).toHaveLength(2)
})