import Note from "./components/Note";

const App = ({ notes }) => {
  console.log('notes inside app before returning to index for rendering', notes);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {notes.map((note) => <Note key={note.id} content={note.content} />)}
      </ul>
    </div>
  )
}

export default App