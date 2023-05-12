import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/persons'
import PersonForm from './components/personsForm'
import FilterSearch from './components/filterSearch'
import PersonResources from './services/persons'
import Notif from './components/Notif'

const App = () => {
    // [
    //     { name: 'Arto Hellas', number: '040-123456', id: 1 },
    //     { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    //     { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    //     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    // ]
    const handleFetch = () => {
        axios.get('http://localhost:3001/persons')
            .then((response) => {
                console.log('fetched data from json-server', response.data)
                const persons = response.data
                //const search_term = search
                setPersons(persons)
                setSearchedPersons(
                    persons.filter(e => e.name.toLocaleLowerCase().search(
                        search.length > 0 ? search.toLocaleLowerCase() : ''
                    ) >= 0
                    )
                )
            }).catch((reason) => {
                console.log('reason for failed fetch', reason)
            })
    }

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [searchedPersons, setSearchedPersons] = useState(persons)
    const [notifMessage, setNotifMesage] = useState(null)
    const [messageClass, setMesageClass] = useState('')

    useEffect(handleFetch, [])

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
            //alert(`hey, the person you're trying to add, ${newName} is already in the phonebook`)
            console.log('trying to update contact');
            if (window.confirm(`${newName} already exists, do you want to update the number?`)) {
                const new_obj = {
                    name: newName,
                    number: newNumber
                }
                const id_num = persons.find(el => el.name === newName).id;
                console.log('id_num', id_num);
                PersonResources
                    .updatePerson(id_num, new_obj, setNotifMesage, setMesageClass)
                    .then(data => {
                        const persons_ = persons
                        const updatedPersons = persons_.map(n => n.id !== id_num ? n : data)
                        console.log('updaed persons', updatedPersons)
                        setPersons(updatedPersons);
                        setSearchedPersons(updatedPersons.filter(e => e.name.toLocaleLowerCase().search(search.length > 0 ? search.toLocaleLowerCase() : '') >= 0));
                        setNewName('')
                        setNewNumber('')
                    })
            } else {
                console.log('my bad, dont wanna update the person');
            }
        }
        else if (persons.filter((el) => el.number === newNumber).length > 0) {
            //alert(`hey, the number you're trying to add, ${newNumber} is already owned by another person`)
            setNotifMesage(`hey, the number you're trying to add, ${newNumber} is already owned by another person`);
            setMesageClass('already')
            setTimeout(() => {
                setNotifMesage(null);
            }, 5000)
        }

        else {
            console.log('good job, no duplicates')
            const persons_ = persons
            PersonResources
                .addPerson({
                    name: newName,
                    number: newNumber
                }, setNotifMesage, setMesageClass)
                .then(data => {
                    setPersons(persons_.concat(data));
                    setNewName('');
                    setNewNumber('');
                    setSearchedPersons(persons_.concat(data).filter(e => e.name.toLocaleLowerCase().search(search.length > 0 ? search.toLocaleLowerCase() : '') >= 0))

                })
        }
    }

    const deletePersonInUI = (id) => {
        const persons_ = persons
        setPersons(persons_.filter(n => n.id !== id));
        setSearchedPersons(persons_.filter(n => n.id !== id)
            .filter(e =>
                e.name.toLocaleLowerCase()
                    .search(search.length > 0
                        ? search.toLocaleLowerCase()
                        : ''
                    ) >= 0)
        );
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notif message={notifMessage} class_={messageClass} />
            <FilterSearch search={search} handleSearch={handleSearch} />
            <PersonForm handleSubmit={handleSubmit} handleTyping={handleTyping} handleTypingNumbers={handleTypingNumbers} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <div>
                <Persons contacts={searchedPersons} deleteInUI={deletePersonInUI} setMessage={setNotifMesage} setMessageClass={setMesageClass} />
            </div>
        </div>
    )
}

export default App