import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE } from "../actions/" //Import the actions types constant we defined in our actions
 
let initState = {
    labelColors: ['#FFB379', '#FFE079', '#79EFFF', '#79B6FF', '#E679FF', '#FF799F', '#091929'],
    data: [],
    loading: true
};
 
const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            return  {...state, data: action.payload}
            // state = Object.assign({}, state, { data: action.data, loading:false });
            // return state;
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