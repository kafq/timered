import { combineReducers } from 'redux';
 
import {    DATA_AVAILABLE,
            ADD_NEW_TIMER,
            UPDATE_NEW_TIMER_COLOR,
            UPDATE_NEW_TIMER_TITLE,
            UPDATE_NEW_TIMER_DURATION, } from "../actions/" //Import the actions types constant we defined in our actions
 
let initState = {
    newTimerColor: '#FFB379',
    newTimerTitle: 'New Timer',
    newTimerDuration: 30000,
    timers: [
        {id: 0, title: 'Add Redux actions dispatcher', duration: 72000, isPaused: false},
        {id: 1, title: 'Move functions to Redux actions', duration: 72000, isPaused: false},
        {id: 2, title: 'Remove deprecated code', duration: 72000, isPaused: false},    
    ],
    labelColors: ['#FFB379', '#FFE079', '#79EFFF', '#79B6FF', '#E679FF', '#FF799F', '#091929'],
    data: [],
    loading: true
};
 
const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            return { ...state, data: action.payload }
        
        case ADD_NEW_TIMER:
            return { ...state, timers: [...state.timers, action.payload]}
        
        case UPDATE_NEW_TIMER_COLOR:
            return { ...state, newTimerColor: action.payload }

        case UPDATE_NEW_TIMER_TITLE:
            return { ...state, newTimerTitle: action.payload}

        case UPDATE_NEW_TIMER_DURATION:
            return { ...state, newTimerDuration: action.payload}

        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;