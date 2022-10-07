const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  return (
    <p>{props.p} {props.ex}</p>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part p={props.p1} ex={props.ex1} />
      <Part p={props.p2} ex={props.ex1} />
      <Part p={props.p3} ex={props.ex3} />
    </div>
  );
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  );
}


const App = () => {
  const course = 'Half Stack Application development'
  const part1 = 'fundamentals of react'
  const exersises1 = 10
  const part2 = 'using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} ex1={exersises1} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3} />
      <Total ex1={exersises1} ex2={exercises2} ex3={exercises3} />
    </div>
  );

}

export default App;