import {handleActions, createAction} from "redux-actions";

const SET_ISLOGIN = "LOGIN_INPUT/SET_ISLOGIN";

const REDUCER_NAME = "isLogin";

export const setIsLogin = createAction(SET_ISLOGIN);

const initialState = true;

export default handleActions({
    [setIsLogin] : (state, { payload }) => (payload)
}, initialState);

export const isLoginSelector = state => state[REDUCER_NAME];