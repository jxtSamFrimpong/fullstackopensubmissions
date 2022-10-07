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
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </>
  );
}

const Total = (props) => {
  console.log(props);
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  );
}


const App = () => {
  const course = {
    name: 'Half Stack Application development',
    parts: [
      {
        name: 'fundamentals of react',
        exercises: 10
      },
      {
        name: 'using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );

}

export default App;