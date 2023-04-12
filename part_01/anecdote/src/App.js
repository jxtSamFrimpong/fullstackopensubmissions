import { useState } from 'react'

const ShowVotes = ({ votes, selected }) => {
  return (
    <p>has {votes[selected]} votes</p>
  )
}

const Button = ({ handler, displayText }) => {
  return (
    <button onClick={handler}>{displayText}</button>
  )
}

const Headline = ({ headeline }) => {
  return (<h1>{headeline}</h1>)
}

const ShowMost = ({ anecdotes, votes }) => {
  const indexOfMost = votes.indexOf([...votes].sort((a, b) => a - b).pop())
  return (
    <div>
      <p>{anecdotes[indexOfMost]}</p>
      <ShowVotes votes={votes} selected={indexOfMost} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(new Array(anecdotes.length).fill(0))

  const newAnecdote = () => {
    const selectionNumber = Math.floor(Math.random() * anecdotes.length)
    console.log(selectionNumber)
    setSelected(selectionNumber)
  }

  const updateVoteCount = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    updateVotes(newVotes)
  }


  return (
    <div>
      <Headline headeline={'Anecdotes of the day'} />
      <p>{anecdotes[selected]}</p>
      <ShowVotes selected={selected} votes={votes} />
      <span>
        <Button handler={newAnecdote} displayText={'new anecdote'} />
        <Button handler={updateVoteCount} displayText={'vote'} />
      </span>
      <br />
      <Headline headeline={'Anecdote with the most votes'} />
      <ShowMost anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App