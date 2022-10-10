import { useState } from 'react';

const Header = ({ headertext }) => {
  return (
    <div>
      <h1>{headertext}</h1>
    </div>
  );
}

const Buttons = ({ buttonText, onClick }) => {
  return (<button onClick={onClick}>{buttonText}</button>);
}

const Counterbles = ({ labelName, amount }) => {
  return (<p>{labelName} {amount}</p>);
}

const CounterblesGen = ({ feedback }) => {
  if (
    feedback.good.amount === 0 && feedback.neutral.amount === 0 && feedback.bad.amount === 0
  ) {
    return <div>
      <p>No feedback received yet</p>
    </div>
  }
  return (<div>
    <Counterbles labelName={feedback.good.name} amount={feedback.good.amount} />
    <Counterbles labelName={feedback.neutral.name} amount={feedback.neutral.amount} />
    <Counterbles labelName={feedback.bad.name} amount={feedback.bad.amount} />
  </div>);
}

const App = () => {
  const [headertext, stats] = ['give feedback', 'statistics']
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

  const handleFeedback = (name) => {
    if (name.toString() === 'good') {
      // let newVal = feedbackAmounts
      // newVal.good += 1
      setFeedback({ ...feedback, good: { ...feedback.good, amount: feedback.good.amount += 1 } })
      console.log('updated good', feedback.good)
    }
    else if (name.toString() === 'bad') {
      // let newVal = feedbackAmounts
      // newVal.bad += 1
      setFeedback({ ...feedback, bad: { ...feedback.bad, amount: feedback.bad.amount += 1 } })
      console.log('updated bad', feedback.bad)

    }
    else if (name.toString() === 'neutral') {
      // let newVal = feedbackAmounts
      // newVal.neutral += 1
      setFeedback({ ...feedback, neutral: { ...feedback.neutral, amount: feedback.neutral.amount += 1 } })
      console.log('updated neutral', feedback.neutral)
    }

  }



  return (
    <div>
      <Header headertext={headertext} />
      <span>
        <Buttons buttonText={feedback.good.name} onClick={() => handleFeedback('good')} />
        <Buttons buttonText={feedback.neutral.name} onClick={() => handleFeedback('neutral')} />
        <Buttons buttonText={feedback.bad.name} onClick={() => handleFeedback('bad')} />
      </span>
      <Header headertext={stats} />
      <CounterblesGen feedback={feedback} />
    </div>
  );
}

export default App;