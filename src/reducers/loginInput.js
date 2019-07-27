import {handleActions, createAction} from "redux-actions";

const SET_LOGIN = "LOGIN_INPUT/SET_LOGIN";
const SET_PAROL = "LOGIN_INPUT/ET_PAROL";

const REDUCER_NAME = "loginInput";

export const setLogin = createAction(SET_LOGIN);
export const setParol = createAction(SET_PAROL);

const initialState = { login : '' , pass : '' };

export default handleActions({
    [setLogin] : (state, { payload }) => ({ login : payload , pass : state.pass}),
    [setParol] : (state, { payload }) => ({login: state.login, pass: payload})
}, initialState);

export const loginPassSelector = state => state[REDUCER_NAME];