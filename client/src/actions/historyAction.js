import axios from "axios";
import { GET_HIST_DATA, SET_HIST_DATA, GET_ERRORS } from "./types";


export const getHistoricalData = () => dispatch => {

    console.log("*************")
      axios
        .get("http://localhost:5000/api/covid/history")
        .then(res => {
          return dispatch( {
            type: SET_HIST_DATA,
            payload: res.data
          })
            
          
        }
        
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err
          })
        );
    };
