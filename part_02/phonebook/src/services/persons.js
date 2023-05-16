import axios from "axios";

const baseURL = '/api/persons';

const handleFetch = (setPersons, setSearchedPersons, search) => {
    axios.get(`${baseURL}`)
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

const addPerson = (new_person, setMessage, setMesageClass) => {
    const request = axios.post(baseURL, new_person)
    return request
        .then(response => response.data)
        .then(data => {
            console.log('successfully added person', data)
            setMesageClass('added')
            setMessage(`Person '${new_person.name}' successfully added`)
            setTimeout(() => {
                setMessage(null);
            }, 5000)
            return data;
        })
        .catch(err => {
            console.log(err)
            return [];
        })
}

const deletePerson = (id, name, setMessage, setMesageClass) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then((response) => {
        if (response.status === 204) {
            setMesageClass('added')
            setMessage(`Deleted ${name} succesfully`)
            setTimeout(() => {
                setMessage(null);
            }, 5000)
            return { id, status: response.status }
        }
    })
        .catch((err) => {
            console.log(err);
            setMesageClass('error')
            setMessage(`cloudn't delete ${name}`)
            setTimeout(() => {
                setMessage(null);
            }, 5000)
            return { status: err.status, err }
        })
}

const updatePerson = (id, updatedPerson, setMessage, setMesageClass) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request
        .then((response) => {
            console.log(response);
            setMesageClass('added')
            setMessage(`Person '${updatedPerson.name}' successfully updated`)
            setTimeout(() => {
                setMessage(null);
            }, 5000)
            return response.data;
        })
        .catch(err => {
            console.log(err);
            setMesageClass('error')
            setMessage(`Couldn't add '${updatedPerson.name}'`)
            setTimeout(() => {
                setMessage(null);
            }, 5000)
            return []
        })
}

const PersonResources = { addPerson, deletePerson, updatePerson, handleFetch };

export default PersonResources;