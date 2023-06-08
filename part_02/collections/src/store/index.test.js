import noteReducer from './index'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    test('returns new state with action NEW_NOTE', () => {
        const previousState = noteReducer.getState()
        const state = []
        const action = {
            type: 'NEW_NOTE',
            payload: {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            }
        }

        deepFreeze(state)
        const sendPayload = noteReducer.dispatch(action)
        const newState = noteReducer.getState()
        //console.log(newState)

        expect(newState).toHaveLength(previousState.length + 1)
        expect(newState).toContainEqual(action.payload)
    })
})