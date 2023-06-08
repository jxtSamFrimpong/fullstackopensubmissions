import { useDispatch } from 'react-redux'
import { descend, ascend } from '../reducers/actionCreators'


export const DesButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => { dispatch(descend()) }}>DES</button>
    )
}

export const AscButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => { dispatch(ascend()) }}>ASC</button>
    )
}