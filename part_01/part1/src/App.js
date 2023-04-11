import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = ({allClicks, total}) => {
    if (allClicks.length === 0){
        return (
            <div>The application is used by pressing the buttons</div>
            )
    }

    return (
    <div>
        <p>button press History: {allClicks.join(' ')}</p>
        <p>The button has been pressed a total of {total}</p>
    </div>
    )
}

const App = () => {
    // const [left, setLeft] = useState(0)
    // const [right, setRight] = useState(0)
    const [ clicks, setClicks ] = useState({
        left: 0,
        right: 0
    })
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {

        setAll([...allClicks, 'L'])

        console.log('left before ', clicks.left)

        const leftClicks = clicks.left + 1

        setClicks({
            ...clicks,
            left: leftClicks
        })

        console.log('left after ', leftClicks)

        setTotal(leftClicks + clicks.right)
    }

    const handleRightClick = () => {
        setAll([...allClicks, 'R'])

        console.log('right before ', clicks.right)

        const rightClicks = clicks.right + 1


        setClicks({
            ...clicks,
            right: rightClicks
        })

        console.log('right after ', rightClicks)

        setTotal(clicks.left + rightClicks)
    }

    return (
        <div>
        <div>
            {clicks.left}
            <Button text='left' handleClick={handleLeftClick} />
            <Button text='right' handleClick={handleRightClick} />
            {clicks.right}
        </div>
        <br/>
            <History allClicks={allClicks} total={total} />
        </div>
    )
}

export default App