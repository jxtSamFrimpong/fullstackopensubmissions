import axios from "axios";
const baseURL = "/api/notes"; //https://jxtsamnotes.fly.dev

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseURL, config);
    return request.then((response) => {
        console.log('back cut data on Success', response.data);
        const errorSimulant = {
            id: 10000,
            content: 'i am such a little bitch',
            important: true
        }
        return response.data.concat(errorSimulant);
    }).catch((reason) => {
        console.log('reason for on Failure', reason);
        return []
    })
}

const create = (newObj, old_notes, setAddedNotifMessage, setAddedClass) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.post(baseURL, newObj, config);
    return request
        .then((response) => {
            console.log('posting note to server...', newObj)
            setAddedClass('added');
            setAddedNotifMessage(`Added '${newObj.content}' succesfly`)
            setTimeout(() => {
                setAddedNotifMessage(null)
            }, 5000)
            return old_notes.concat(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            setAddedClass('error');
            setAddedNotifMessage(`'${newObj.content}' couldn't be added`)
            setTimeout(() => {
                setAddedNotifMessage(null)
            }, 5000)
            return old_notes
        })
}

const update = (id, newObj, existing_notes, setErrorNotifMessage, setAddedNotifMessage, setAddedClass) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.put(`${baseURL}/${id}`, newObj, config);
    return request
        .then((response) => {
            setAddedClass('added');
            setAddedNotifMessage(`Added '${newObj.content}' succesfly`)
            setTimeout(() => {
                setAddedNotifMessage(null)
            }, 5000)
            return existing_notes.map(n => n.id === response.data.id ? response.data : n)
        })
        .catch(err => {
            console.log('something went wrong tryin to toggle notes importsnce', err);
            //alert('This note has been removed from backend');
            setErrorNotifMessage(`Note '${newObj.content}' was already removed from server`)
            setTimeout(() => {
                setErrorNotifMessage(null)
            }, 5000)
            return existing_notes.filter(i => i.id !== id);
        });
}

const noteService = { getAll, create, update, setToken }

export default noteService;