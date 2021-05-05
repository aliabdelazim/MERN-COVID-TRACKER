import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import statReducer from "./statisticalReducer";
import histReducer from "./histReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  stat: statReducer,
  hist: histReducer
});
