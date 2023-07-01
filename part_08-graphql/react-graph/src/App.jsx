import { useState } from 'react'
//import PropTypes from 'prop-types'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/Persons/PersonForm'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import Notify from './components/Notif'
import EditPerson from './components/Persons/EditPerson'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000
  })
  const client = useApolloClient()
  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      console.log('person added suscription data', data)
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        const personExists = allPersons.find(p => p.id === addedPerson.id)
        if (personExists) {
          return {
            allPersons: allPersons.map(p => p.id !== addedPerson.id ? p : addedPerson)
          }
        }
        else {
          return {
            allPersons: allPersons.concat(addedPerson),
          }
        }
      })
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <EditPerson setError={notify} />
    </>
  )
}

export default App