//import { createStore } from 'redux'

const feedReducer = (state = {
    good: 0,
    bad: 0,
    neutral: 0
}, action) => {

    switch (action.type) {
        case 'GOOD':
            //console.log('called good', action.payload, state);
            const newGood = state.good + 1
            return { ...state, good: newGood }
        case 'NEUTRAL':
            //console.log('called neutal');
            const newNeutral = state.neutral + 1
            return { ...state, neutral: newNeutral }
        case 'BAD':
            //console.log('called bad')
            const newBad = state.bad + 1
            return { ...state, bad: newBad }
        case 'RESET':
            return {
                good: 0,
                bad: 0,
                neutral: 0
            }
        default:
            return state
    }
}

// const feedReducer = createStore(feed)

export default feedReducer