import {handleActions, createAction} from "redux-actions";

export const SET_ISNTLOGIN = "LOGIN_VRM/SET_ISNTLOGIN";
export const SET_TOKEN = "LOGIN_VRM/SET_TOKEN";

const REDUCER_NAME = "loginVRM";

export const setIsntLogin = createAction(SET_ISNTLOGIN);
export const setToken = createAction(SET_TOKEN);


const initialState = {islogin: false, username: "", idUser: null, headerWithToken: {} };


export default handleActions({
    [setIsntLogin] : (state, { payload }) =>  initialState,
    [setToken] : (state, { payload }) => payload,
}, initialState);

export const isLoginSelector = state => state[REDUCER_NAME];