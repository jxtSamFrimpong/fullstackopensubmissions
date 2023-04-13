import { useState } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personsForm'
import FilterSearch from './components/filterSearch'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [searchedPersons, setSearchedPersons] = useState(persons)

    const handleTyping = (event) => {
        //event.preventDefault())
        const val_ = event.target.value
        console.log('controlled component newname is ', val_)
        setNewName(val_)
    }

    const handleTypingNumbers = (event) => {
        //event.preventDefault())
        const val_ = event.target.value
        console.log('controlled component newNumber is ', val_)
        setNewNumber(val_)
    }

    const handleSearch = (event) => {
        const val_ = event.target.value
        console.log('search term changed to ', val_)
        setSearch(val_)
        setSearchedPersons(persons.filter(e => e.name.toLowerCase().search(val_.toLocaleLowerCase()) >= 0))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handling a submit event from ... ', event.target)
        if (persons.filter((el) => el.name === newName).length > 0) {
            alert(`hey, the person you're trying to add, ${newName} is already in the phonebook`)
        }
        else if (persons.filter((el) => el.number === newNumber).length > 0) {
            alert(`hey, the number you're trying to add, ${newNumber} is already owned by another person`)
        }

        else {
            console.log('good job, no duplicates')
            const persons_ = persons
            const new_persons = persons_.concat([
                {
                    name: newName,
                    number: newNumber,
                    id: [...persons_].pop().id + 1
                }
            ])
            setPersons(new_persons)
            setNewName('')
            setNewNumber('')
            console.log(typeof (search), search, new_persons.filter(e => e.name.toLocaleLowerCase().search(search.length > 0 ? search : '') >= 0))
            setSearchedPersons(new_persons.filter(e => e.name.toLocaleLowerCase().search(search.length > 0 ? search.toLocaleLowerCase() : '') >= 0))
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <FilterSearch search={search} handleSearch={handleSearch} />
            <PersonForm handleSubmit={handleSubmit} handleTyping={handleTyping} handleTypingNumbers={handleTypingNumbers} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <div>
                <Persons contacts={searchedPersons} />
            </div>
        </div>
    )
}

export default App