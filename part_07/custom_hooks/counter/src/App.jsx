//import { useState } from 'react'
import {useCounter} from './hooks'
const App = () => {
  // const [counter, setCounter] = useState(0)
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={() => counter.increase()}>
        plus
      </button>
      <button onClick={() => counter.decrease()}>
        minus
      </button>      
      <button onClick={() => counter.zero()}>
        zero
      </button>
    </div>
  )
}

export default App