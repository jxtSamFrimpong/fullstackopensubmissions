import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const mockHandler = jest.fn()

    render(<Note content={note.content} importance={note.important} handler={mockHandler} />)
    //const { container } = render(<Note content={note.content} importance={note.important} />)

    const user = userEvent.setup()
    const button = screen.getByRole('checkbox')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)

    //eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    //const div = container.querySelector('.Note_list')
    // eslint-disable-next-line testing-library/no-debugging-utils
    //screen.debug()
    //expect(div).toHaveTextContent('Component testing is done with react-testing-library')

    const element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
    // eslint-disable-next-line testing-library/no-debugging-utils
    //screen.debug(element)
    expect(element).toBeDefined()

    const nullElement = screen.queryByText('do not want this thing to be rendered')
    expect(nullElement).toBeNull()
})