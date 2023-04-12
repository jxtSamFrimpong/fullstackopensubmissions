const Total = (props) => {
    console.log('value of props in Total: ', props)
    const { total } = props

    return (
        <p><strong>
            total of {total} exercises
        </strong></p>
    )
}

export default Total