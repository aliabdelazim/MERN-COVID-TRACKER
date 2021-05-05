import axios from "axios";
import { GET_STAT_DATA, SET_STAT_DATA, GET_ERRORS } from "./types";

export const getStatisticalData = () => dispatch => {

  console.log("*************")
    axios
      .get("http://localhost:5000/api/covid/statistics")
      .then(res => {
        return dispatch( {
          type: SET_STAT_DATA,
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

