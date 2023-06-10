import { useDispatch } from 'react-redux'
// import { descend, ascend } from '../reducers/actionCreators'
import { asc, des } from '../reducers/anecdoteReducer'


export const DesButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => { dispatch(des()) }}>DES</button>
    )
}

export const AscButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => { dispatch(asc()) }}>ASC</button>
    )
}