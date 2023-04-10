import { useState } from 'react'

const App = () => {
    const [counter, setNumber] = useState(0)

    setTimeout(
        () => setNumber(Math.floor(Math.random() * 10)),
        1000
    )
    return (
        <div>{counter}</div>
    )
}

export default App