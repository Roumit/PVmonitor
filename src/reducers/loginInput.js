import {handleActions, createAction} from "redux-actions";
import {testLogin, testPass} from "./testLoginPass";

const SET_LOGIN = "LOGIN_INPUT/SET_LOGIN";
const SET_PAROL = "LOGIN_INPUT/ET_PAROL";
const CLEAR_PASS = "LOGIN_INPUT/CLEAR_PASS"

const REDUCER_NAME = "loginInput";

export const setLogin = createAction(SET_LOGIN);
export const setParol = createAction(SET_PAROL);
export const clearPass = createAction(CLEAR_PASS);

const initialState = { login : testLogin || "" , pass : testPass || "" };
const clear = { login : "" , pass : "" }

export default handleActions({
    [setLogin] : (state, { payload }) => ({ login : payload , pass : state.pass}),
    [setParol] : (state, { payload }) => ({ login: state.login, pass: payload}),
    [clearPass] : (state, { payload }) => (clear),
}, initialState);

export const loginPassSelector = state => state[REDUCER_NAME];