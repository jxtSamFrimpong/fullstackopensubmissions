import { asObject } from "./anecdoteReducer"

export const addVote = id => {
    return { type: 'VOTE', payload: id }
}

export const addDote = (dote) => {
    return {
        type: 'DOTE',
        payload: asObject(dote)
    }
}

export const descend = () => {
    return {
        type: 'DES'
    }
}

export const ascend = () => {
    return { type: 'ASC' }
}