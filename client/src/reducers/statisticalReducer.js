import { SET_STAT_DATA, GET_STAT_DATA } from "../actions/types";


const initialState = {
    stat: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_STAT_DATA: 
            return {
                stat: action.payload
            }
        case GET_STAT_DATA:
            return action.payload
        default:
            return state;
    }
};