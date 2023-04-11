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
    <p>{displayText} {count}</p>
  )
}

const AllFeed = ({ displayText, feed }) => {
  return (
    <p>{displayText} {feed.good + feed.bad + feed.neutral}</p>
  )
}

const AvgFeed = ({ displayText, feed }) => {
  return (
    <p>{displayText} {((feed.good - feed.bad) / (feed.good + feed.bad + feed.neutral)).toFixed(3)}</p>
  )
}

const PosFeed = ({ displayText, feed }) => {
  return (
    <p>{displayText} {(((feed.good) / (feed.good + feed.neutral + feed.bad)) * 100).toFixed(2)} %</p>
  )
}

const Statistics = ({ feed }) => {
  if ((feed.good + feed.bad + feed.neutral) === 0) {
    return (
      <p>Feedback not given yet</p>
    )
  }
  return (
    <div>
      <StatisticLine displayText={'good'} count={feed.good} />
      <StatisticLine displayText={'neutral'} count={feed.neutral} />
      <StatisticLine displayText={'bad'} count={feed.bad} />
      <AllFeed displayText={'all'} feed={feed} />
      <AvgFeed displayText={'average'} feed={feed} />
      <PosFeed displayText={'positive'} feed={feed} />
    </div>
  )
}

const App = () => {
  const [feed, feedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const goodHandler = () => {
    const newGood = feed.good + 1
    feedBack({
      ...feed,
      good: newGood
    })
  }

  const badHandler = () => {
    const newBad = feed.bad + 1
    feedBack({
      ...feed,
      bad: newBad
    })
  }

  const neutralHandler = () => {
    const newNeutral = feed.neutral + 1
    feedBack({
      ...feed,
      neutral: newNeutral
    })
  }

  return (
    <div>
      <Headline displayText='give feedback' />
      <span>
        <Button displayText={'good'} handler={goodHandler} />
        <Button displayText={'neutral'} handler={neutralHandler} />
        <Button displayText={'bad'} handler={badHandler} />
      </span>
      <Headline displayText={'statistics'} />
      <Statistics feed={feed} />
    </div>
  )
}

export default App