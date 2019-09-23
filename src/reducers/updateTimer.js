import { handleActions, createAction } from "redux-actions";

const REDUCER_NAME = "updateTimer";

const SET_TIMER = "UPDATE_TIMER/SET_TIMER";

export const setTimer = createAction(SET_TIMER);

const initialState = 0;

export default handleActions({
    [setTimer]: (state, { payload }) => payload,
}, initialState);

export const timerSelector = state => state[REDUCER_NAME]; 
