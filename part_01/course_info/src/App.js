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
      <Part part_name={props.parts[0]} part_exercise={props.exercises[0]} />
      <Part part_name={props.parts[1]} part_exercise={props.exercises[1]} />
      <Part part_name={props.parts[2]} part_exercise={props.exercises[2]} />
    </div>
  );
}

const Part = (props) => {
  return (
    <p>{props.part_name} {props.part_exercise}</p>
  )
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
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercise1, exercise2, exercise3]} />
      <Total total={exercise1 + exercise2 + exercise3} />
    </div>
  )
}

export default App;