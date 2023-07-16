interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type coursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ coursename }: { coursename: string }) => {
  return (
    <h1>{coursename}</h1>
  )
};

const Content = ({ courseParts }: { courseParts: coursePart[] }) => {
  return (
    <>
      {courseParts.map(course => <Part course={course} key={course.name} />)}
    </>
  )
}

const Part = ({ course }: { course: coursePart }) => {
  switch (course.kind) {
    case 'background':
      return <p><strong>{course.name}</strong> {course.exerciseCount} <br /><em>{course.description}</em> <br />submit to: {course.backgroundMaterial}</p>
    case 'basic':
      return <p><strong>{course.name}</strong> {course.exerciseCount} <br /><em>{course.description}</em></p>
    case 'group':
      return <p><strong>{course.name}</strong> {course.exerciseCount} <br />projNum: {course.groupProjectCount}</p>
    case 'special':
      return <p><strong>{course.name}</strong> {course.exerciseCount}<br /><em>course.description</em><br />required skills: {course.requirements.map(i => <span key={i}>{i}, </span>)}</p>
    default:
      return null
  }
}

const Total = ({ numOfExercises }: { numOfExercises: number }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {numOfExercises}
      </p>
    </>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: coursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/tstrongplate-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header coursename={courseName} />
      <Content courseParts={courseParts} />
      <Total numOfExercises={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;