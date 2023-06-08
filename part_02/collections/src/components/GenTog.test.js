import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './GenTog'

describe('<Togglable />', () => {
    let container

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        container = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" >
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.findAllByText('togglable content')
    })

    test('at start the children are not displayed', () => {
        // eslint-disable-next-line testing-library/no-node-access
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        // eslint-disable-next-line testing-library/no-node-access
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)

        // eslint-disable-next-line testing-library/no-node-access
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})