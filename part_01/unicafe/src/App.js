import { useState } from 'react'


const Headline = ({ displayText }) => {
  return (
    <h1>{displayText}</h1>
  )
}

const Button = ({ displayText, handler }) => {
  return (
    <button onClick={handler}>{displayText}</button>
  )
}

const StatisticLine = ({ displayText, count }) => {
  return (
    <tr>
      <td>{displayText}</td>
      <td>{count}</td>
    </tr>
  )
}

const AllFeed = ({ displayText, feed }) => {
  return (
    <tr>
      <td>{displayText}</td>
      <td>{feed.good + feed.bad + feed.neutral}</td>
    </tr>
  )
}

const AvgFeed = ({ displayText, feed }) => {
  return (
    <tr>
      <td>{displayText}</td>
      <td>{((feed.good - feed.bad) / (feed.good + feed.bad + feed.neutral)).toFixed(3)}</td>
    </tr>
  )
}

const PosFeed = ({ displayText, feed }) => {
  return (
    <tr>
      <td>{displayText}</td>
      <td>{(((feed.good) / (feed.good + feed.neutral + feed.bad)) * 100).toFixed(2)} %</td>
    </tr>
  )
}

const ResetStats = ({ resetHandler }) => {
  return (
    <Button displayText={'reset stats'} handler={resetHandler} />
  )
}

const Statistics = ({ feed }) => {
  console.log('recieved feed', feed)
  if ((feed.good + feed.bad + feed.neutral) === 0) {
    return (
      <p>Feedback not given yet</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine displayText={'good'} count={feed.good} />
          <StatisticLine displayText={'neutral'} count={feed.neutral} />
          <StatisticLine displayText={'bad'} count={feed.bad} />
          <AllFeed displayText={'all'} feed={feed} />
          <AvgFeed displayText={'average'} feed={feed} />
          <PosFeed displayText={'positive'} feed={feed} />
        </tbody>
      </table>
    </div>
  )
}

const App = ({ store }) => {
  const [feed, feedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const goodHandler = () => {
    // const newGood = feed.good + 1
    // feedBack({
    //   ...feed,
    //   good: newGood
    // })
    const state = store.getState()
    store.dispatch({ type: 'GOOD', payload: state })
  }

  const badHandler = () => {
    // const newBad = feed.bad + 1
    // feedBack({
    //   ...feed,
    //   bad: newBad
    // })
    const state = store.getState()
    store.dispatch({ type: 'BAD', payload: state })
  }

  const neutralHandler = () => {
    // const newNeutral = feed.neutral + 1
    // feedBack({
    //   ...feed,
    //   neutral: newNeutral
    // })
    const state = store.getState()
    store.dispatch({ type: 'NEUTRAL', payload: state })
  }

  const resetHandler = () => { store.dispatch({ type: 'RESET' }) }

  return (
    <div>
      <Headline displayText='give feedback' />
      <span>
        <Button displayText={'good'} handler={goodHandler} />
        <Button displayText={'neutral'} handler={neutralHandler} />
        <Button displayText={'bad'} handler={badHandler} />
        <ResetStats resetHandler={resetHandler} />
      </span>
      <Headline displayText={'statistics'} />
      <Statistics feed={store.getState()} />
    </div>
  )
}

export default App