import { createStore , combineReducers } from "redux";

export const configStore = (reducers) => createStore(combineReducers(reducers));