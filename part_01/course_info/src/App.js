const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.parts[0]} {props.exercises[0]}</p>
      <p>{props.parts[1]} {props.exercises[1]}</p>
      <p>{props.parts[2]} {props.exercises[2]}</p>
    </div>
  );
}

const Total = (props) => {
  return (
    <p>
      Number of exercises are {props.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of react'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of component'
  const exercise3 = 14
  return (
    <div>
      {/* <h1>{course}</h1> */}
      <Header course={course} />
      {/* <p>{part1} {exercise1}</p>
      <p>{part2} {exercise2}</p>
      <p>{part3} {exercise3}</p> */}
      <Content parts={[part1, part2, part3]} exercises={[exercise1, exercise2, exercise3]} />
      {/* <p>Number of exercises are {exercise1 + exercise2 + exercise3}</p> */}
      <Total total={exercise1 + exercise2 + exercise3} />
    </div>
  )
}

export default App;