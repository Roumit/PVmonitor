import { createStore , combineReducers, applyMiddleware } from "redux";
import { logger } from "./middlewares";

export const configStore = (reducers, middlewares) => {
   return createStore(combineReducers(reducers), {}, applyMiddleware(...middlewares));
};