import { SET_HIST_DATA, GET_HIST_DATA } from "../actions/types";


const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_HIST_DATA: 
            return action.payload
            
        case GET_HIST_DATA:
            return action.payload
        default:
            return state;
    }
};