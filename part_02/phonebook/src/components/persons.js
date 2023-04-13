const Persons = ({ contacts }) => {
    return (
        <table>
            <tbody>
                {contacts.map((contact) => <tr key={contact.id}><td>{contact.name}</td><td>{contact.number}</td></tr>)}
            </tbody>
        </table>
    )
}

export default Persons