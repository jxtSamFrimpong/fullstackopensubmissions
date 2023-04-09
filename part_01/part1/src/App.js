const Hello = (props) => {
    console.log(props)
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    // let date_now = new Date().toISOString();
    // const a = 5;
    // const b = 19;
    // console.log(date_now, a, b, a + b)
    const friends = ['perter', 'maya']
    return (
        <div>
            <h1>Greeting</h1>
            <Hello name='Sammy' age='16' />
            <Hello name='Odiawuo' age='idk' />
            <p>{friends}</p>
        </div>
    )
}

export default App                                      