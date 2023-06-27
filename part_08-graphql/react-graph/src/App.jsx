//import { useState } from 'react'
//import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/Persons/PersonForm'

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

// const FIND_PERSON = gql`
//   query findPersonByName($nameToSearch: String!) {
//     findPerson(name: $nameToSearch) {
//       name
//       phone
//       id
//       address {
//         street
//         city
//       }
//     }
//   }
// `

// const Person = ({ person, onClose }) => {

//   Person.propTypes = {
//     person: PropTypes.object.isRequired,
//     onClose: PropTypes.func.isRequired
//   }


//   return (
//     <div>
//       <h2>{person.name}</h2>
//       <div>
//         {person.address.street} {person.address.city}
//       </div>
//       <div>{person.phone}</div>
//       <button onClick={onClose}>close</button>
//     </div>
//   )
// }

// const Persons = ({ persons }) => {

//   Persons.propTypes = {
//     persons: PropTypes.array.isRequired,
//   }

//   const [nameToSearch, setNameToSearch] = useState(null)
//   const result = useQuery(FIND_PERSON, {
//     variables: { nameToSearch },
//     skip: !nameToSearch,
//   })

//   if (nameToSearch && result.data) {
//     return (
//       <Person
//         person={result.data.findPerson}
//         onClose={() => setNameToSearch(null)}
//       />
//     )
//   }

//   return (
//     <div>
//       <h2>Persons</h2>
//       {persons.map((p) => (
//         <div key={p.name}>
//           {p.name} {p.phone}
//           <button onClick={() => setNameToSearch(p.name)}>
//             show address
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }

const App = () => {
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </>
  )
}

export default App