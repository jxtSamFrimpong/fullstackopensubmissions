import { createContext, useReducer, useContext } from 'react'

const NotifReducer = (state, action)=>{
    switch(action.type){
        case 'SET':
            return action.payload
        default:
            return state
    }
}

const NotifContext = createContext()

export const NotifContextProvider = (props)=>{
    const [notif, notifDispatch] = useReducer(NotifReducer, '')

    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    )
}

export default NotifContext

// export const notifValueContext = () => {
//     const value = useContext(NotifContext)
//     return value[0]
// }

// export const notifDispatchContext = () => {
//     const dispatch = useContext(NotifContext)
//     return dispatch[1]
// }