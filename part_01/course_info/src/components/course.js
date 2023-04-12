import Header from './Header'
import Content from './content'
import Total from './total'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts.map(val => val.exercises).reduce((a, b) => a + b)} />
        </div>
    )
}

export default Course