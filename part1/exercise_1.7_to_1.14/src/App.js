import { useState } from 'react';

const Header = ({ headertext }) => {
  return (
    <h1>{headertext}</h1>
  );
}

const Buttons = ({ buttonText, onClick }) => {
  return (<button onClick={onClick}>{buttonText}</button>);
}

const Statisticsline = ({ text, value }) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>);
}

const CounterblesGen = ({ feedback }) => {
  if (
    feedback.good.amount === 0 && feedback.neutral.amount === 0 && feedback.bad.amount === 0
  ) {
    return (
      <tr><td>No feedback given</td></tr>)
  }
  return (<>
    <Statisticsline text={feedback.good.name} value={feedback.good.amount} />
    <Statisticsline text={feedback.neutral.name} value={feedback.neutral.amount} />
    <Statisticsline text={feedback.bad.name} value={feedback.bad.amount} />
    <Statistics feedback={feedback} />
  </>);
}

const Average = ({ feedback }) => {
  let average = (feedback.good.amount - feedback.bad.amount) / (feedback.good.amount + feedback.neutral.amount + feedback.bad.amount)
  if (isNaN(average)) {
    return (<tr><td>average</td><td>0</td></tr>)
  }
  return (
    <tr><td>average</td><td>{average}</td></tr>);
}

const All = ({ all }) => {
  if (isNaN(all)) {
    return (<></>)
  }
  return (<tr><td>all</td><td>{all}</td></tr>);
}

const Positive = ({ feedback }) => {
  let positive = (feedback.good.amount / (feedback.good.amount + feedback.neutral.amount + feedback.bad.amount))
  if (isNaN(positive)) {
    return (<tr><td>positive</td><td>0</td></tr>)
  }
  return (<tr><td>positive</td><td>{positive * 100} %</td></tr>)
}

// const Statisticsline = ({text, value})=>{
//   if(isNaN(value)){
//     return(<>{text} 0</>)
//   }
//   return (<p>{text} {value}</p>)
// }

const Statistics = ({ feedback }) => {
  //let all = feedback.good.amount + feedback.neutral.amount + feedback.bad.amount;
  //let positive = (feedback.good.amount / (feedback.good.amount + feedback.neutral.amount + feedback.bad.amount))
  //let average = (feedback.good.amount - feedback.bad.amount) / (feedback.good.amount + feedback.neutral.amount + feedback.bad.amount)

  return (
    <>
      <All all={feedback.good.amount + feedback.neutral.amount + feedback.bad.amount} />
      <Average feedback={feedback} />
      <Positive feedback={feedback} />
    </>
  )
}

const Voted = ({ value }) => {
  if (value === undefined) {
    return <p>has 0 votes</p>
  }
  return <p>has {value} votes</p>
}

const MostVotes = ({ current, anecdotes, anecAnswers }) => {
  let [biggestSoFar, dote] = [0, anecdotes[current]]

  anecdotes.forEach(element => {
    if (anecAnswers[`${element}`] !== undefined) {
      if (anecAnswers[`${element}`] > biggestSoFar) {
        biggestSoFar = anecAnswers[`${element}`]
        dote = element
      }
    }
  });
  return (<>
    <p>{dote}</p>
    <p>has {biggestSoFar} votes</p>
  </>)
}


const App = () => {
  //const [headertext] = ['give feedback']
  const [stats] = ['statistics']
  const [feedback, setFeedback] = useState({
    good: {
      name: 'good',
      amount: 0
    },
    bad: {
      name: 'bad',
      amount: 0
    },
    neutral: {
      name: 'neutral',
      amount: 0
    }
  });

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const [anecNum, setAnecNumState] = useState(Math.floor(Math.random() * anecdotes.length));

  const [anecAnswers, setAnecAnswers] = useState({});

  const handleFeedback = (name) => {
    if (name.toString() === 'good') {
      setFeedback({ ...feedback, good: { ...feedback.good, amount: feedback.good.amount += 1 } })
      console.log('updated good', feedback.good)
    }
    else if (name.toString() === 'bad') {
      setFeedback({ ...feedback, bad: { ...feedback.bad, amount: feedback.bad.amount += 1 } })
      console.log('updated bad', feedback.bad)

    }
    else if (name.toString() === 'neutral') {
      setFeedback({ ...feedback, neutral: { ...feedback.neutral, amount: feedback.neutral.amount += 1 } })
      console.log('updated neutral', feedback.neutral)
    }

  }

  const nextAnecdote = (current) => {
    let newnum = Math.floor(Math.random() * anecdotes.length)
    while (newnum === current) {
      newnum = Math.floor(Math.random() * anecdotes.length)
    }
    setAnecNumState(newnum)
  }

  const voteAnecdote = (current) => {
    let answers = { ...anecAnswers }
    if (isNaN(answers[`${current}`] + 0)) {
      answers[`${current}`] = 1
    } else {
      answers[`${current}`] += 1
    }
    setAnecAnswers(answers)
    console.log('votes', answers)
  }



  return (
    <div>
      <Header headertext={anecdotes[anecNum]} />
      <p>
        <span>
          <Buttons buttonText={'next anecdote'} onClick={() => nextAnecdote(anecNum)} />
          <Buttons buttonText={'vote'} onClick={() => voteAnecdote(anecdotes[anecNum])} />
        </span>
      </p>
      {/* <p>
        has {() => voted(anecAnswers[`${anecdotes[anecNum]}`])} votes
      </p> */}
      <Voted value={anecAnswers[`${anecdotes[anecNum]}`]} />
      <Header headertext={'Anecdotes with the most votes'} />
      <MostVotes anecAnswers={anecAnswers} anecdotes={anecdotes} current={anecNum} />

      <hr />
      <span>
        <Buttons buttonText={feedback.good.name} onClick={() => handleFeedback('good')} />
        <Buttons buttonText={feedback.neutral.name} onClick={() => handleFeedback('neutral')} />
        <Buttons buttonText={feedback.bad.name} onClick={() => handleFeedback('bad')} />
      </span>
      <table>
        <thead><tr><th><Header headertext={stats} /></th></tr></thead>
        <tbody><CounterblesGen feedback={feedback} /></tbody>
      </table>
    </div>
  );
}

export default App;