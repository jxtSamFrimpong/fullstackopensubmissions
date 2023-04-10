const Hello = ({ name, age }) => {
    //console.log(props)
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you were born in {bornYear()}</p>
        </div>
    )
}

const App = () => {
    // let date_now = new Date().toISOString();
    const sam = 15;
    const odd = 19;
    // console.log(date_now, a, b, a + b)
    // const friends = ['perter', 'maya']
    return (
        <div>
            <h1>Greeting</h1>
            <Hello name='Sammy' age={sam} />
            <Hello name='Odiawuo' age={odd} />
            {/* <p>{friends}</p> */}
        </div>
    )
}

export default App                                      