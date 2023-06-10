import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// export const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action){
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
    },
    dote(state, action){
      return [...state].concat(action.payload)
    },
    asc(state, action){
      return [...state].sort((a, b) => a.votes - b.votes)
    },
    des(state, action){
      return [...state].sort((a, b) => b.votes - a.votes)
    }, 
    setAll(state, action){
      return action.payload
    } 
  }
})

export const voteThunk =(body)=>{
  return async(dispatch)=>{
    const response = await anecdoteService.upVote(body)
        dispatch(vote(response))
  }
}

export const setAllThunk = ()=>{
  return async(dispatch)=>{

  const response = await anecdoteService.getAll()
  //console.log('fetcher', response)
  dispatch(setAll(response))

  }
}

export const doteThunk =(body)=>{
  return async(dispatch)=>{
    const response = await anecdoteService.createDote(body)
    dispatch(dote(response)) 
  }
}

export const { vote, dote, asc, des, get, setAll } = anecdoteReducer.actions
export default anecdoteReducer.reducer