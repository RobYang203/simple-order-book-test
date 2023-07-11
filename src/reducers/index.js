import { combineReducers } from "redux";
import orderbook from "./orderbookReducer";


const appReducer = combineReducers({ orderbook });
export default appReducer;
