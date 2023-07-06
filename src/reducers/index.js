import { combineReducers } from "redux";
import video from "./videoReducer";


const appReducer = combineReducers({ video });
export default appReducer;
