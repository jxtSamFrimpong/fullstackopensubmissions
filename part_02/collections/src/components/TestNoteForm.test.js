import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './TestNoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    const input = screen.getAllByRole('textbox')
    const contentBox = screen.getByPlaceholderText('write note content here')
    const sendButton = screen.getByText('save')

    await user.type(contentBox, 'testing a form...')
    await user.type(input[1], 'testing a form... again')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')

    const { container } = render(<NoteForm createNote={createNote} />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input2 = container.querySelector('#note-input')
})