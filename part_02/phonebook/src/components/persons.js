import PersonResources from '../services/persons'

const Persons = ({ contacts, deleteInUI, setMessage, setMessageClass }) => {

    const handleOnDelete = (id, name) => {
        console.log(`wants tp delete ${id}`)
        if (window.confirm(`Are you sure yoou want to delete ${name} ?`)) {
            PersonResources
                .deletePerson(id, name, setMessage, setMessageClass)
                .then(response => {
                    if (response.status === 200) {
                        deleteInUI(id)
                    }
                });
        } else {
            console.log(`decided not to delete ${name} again`);
        }
    }


    return (
        <table>
            <tbody>
                {contacts.map(
                    (contact) => {
                        return <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.number}</td>
                            <td>
                                <button type="submit" onClick={
                                    () => { handleOnDelete(contact.id, contact.name) }
                                }>Delete</button>
                            </td>
                        </tr>
                    }
                )}
            </tbody>
        </table>
    )
}

export default Persons;