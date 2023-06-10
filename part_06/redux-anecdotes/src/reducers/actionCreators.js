import { asObject } from "./anecdoteReducer"

export const addVote = id => {
    return { type: 'anecdote/vote', payload: id }
}

export const addDote = (dote) => {
    return {
        type: 'anecdote/dote',
        payload: asObject(dote)
    }
}

export const descend = () => {
    return {
        type: 'anecdote/des'
    }
}

export const ascend = () => {
    return { type: 'anecdote/asc' }
}