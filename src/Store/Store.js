import { createStore, applyMiddleware } from "redux";
import CombineReducers from "../Reducers/CombineReducers"
import thunk from "redux-thunk"

const persistedState = localStorage.getItem("reduxStore") ? JSON.parse(localStorage.getItem('reduxStore')):{}
const Store = createStore(
    CombineReducers,
    persistedState,
    applyMiddleware(thunk)
)



export default Store