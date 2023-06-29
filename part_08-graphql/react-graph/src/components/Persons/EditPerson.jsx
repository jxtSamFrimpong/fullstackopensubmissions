import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../../queries'
// import { ALL_PERSONS } from '../../queries'



const EditPerson = ({ setError }) => {
    EditPerson.propTypes = {
        setError: PropTypes.func.isRequired
    }
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [changeNumber, result] = useMutation(EDIT_NUMBER, {
        // refetchQueries: [{ query: ALL_PERSONS }],
        onError: (error) => {
            console.log(error)
            const messages = error.graphQLErrors[0].message
            setError(messages)
        }
    })

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError('person not found')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()

        changeNumber({ variables: { name, phone } })

        setName('')
        setPhone('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    name <input value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone <input value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <button type='submit'>change!</button>
            </form>
        </div>
    )
}

export default EditPerson