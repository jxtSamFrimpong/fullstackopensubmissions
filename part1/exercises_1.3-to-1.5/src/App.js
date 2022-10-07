const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  console.log(props);
  return (
    <>
      <p>{props.p1.name} {props.p1.exercises}</p>
      <p>{props.p2.name} {props.p2.exercises}</p>
      <p>{props.p3.name} {props.p3.exercises}</p>
    </>
  );
}

const Total = (props) => {
  console.log(props);
  return (
    <p>Number of exercises {props.p1.exercises + props.p2.exercises + props.p3.exercises}</p>
  );
}


const App = () => {
  const course = 'Half Stack Application development'
  const part1 = {
    name: 'fundamentals of react',
    exercises: 10
  }
  const part2 = {
    name: 'using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total p1={part1} p2={part2} p3={part3} />
    </div>
  );

}

export default App;