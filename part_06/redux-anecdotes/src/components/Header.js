import { DesButton, AscButton } from "./SortButtons"

const Header = () => {
    return (
        <h2>Anecdotes
            <span>
                {/* <button onClick={() => { dispatch(descend()) }}>DES</button>
          <button onClick={() => { dispatch(ascend()) }}>ASC</button> */}
                <DesButton />
                <AscButton />
            </span>
        </h2>
    )
}

export default Header