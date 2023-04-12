import Part from './parts'

const Content = (props) => {
    console.log(props)
    const { parts } = props
    return (
        <div>
            {/* <Part part={parts[0]} /> */}
            {/* <Part part={parts[1]} /> */}
            {/* <Part part={parts[2]} /> */}
            {parts.map((el) => {
                //console.log('the individual part', el)
                return (
                    <Part key={el.id} part={el} />
                )
            })}
        </div>
    );
}

export default Content