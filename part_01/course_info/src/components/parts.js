const Part = (props) => {
    console.log(props)
    const { part } = props

    return (
        <p>{part.name} {part.exercises}</p>
    )
}

export default Part