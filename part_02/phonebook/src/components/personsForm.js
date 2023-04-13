const PersonForm = ({ handleSubmit, handleTyping, handleTypingNumbers, newName, newNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* <div>debug: {newName}</div> */}
                name: <input onChange={handleTyping} value={newName} />
            </div>
            <div>number: <input onChange={handleTypingNumbers} value={newNumber} /></div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default PersonForm