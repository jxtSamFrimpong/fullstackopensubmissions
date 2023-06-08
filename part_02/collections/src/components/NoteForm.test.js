import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm />', async () => {
    const setAddedNotifMessage = jest.fn()
    const setAddedClass = jest.fn()
    const setNotes = jest.fn()
    const noteFormRef = {
        current: () => {

        }
    }

    const user = userEvent.setup()

    render(<NoteForm setAddedClass={setAddedClass} setNotes={setNotes} setAddedNotifMessage={setAddedNotifMessage} noteFormRef={noteFormRef} notes={[]} />)

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(noteFormRef.mock.calls).toHaveLength(1)
    expect(setAddedNotifMessage.mock.calls).toHaveLength(1)
    expect(setAddedClass.mock.calls).toHaveLength(1)
    expect(setNotes.mock.calls).toHaveLength(1)
})