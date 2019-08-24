import {handleActions, createAction} from "redux-actions";

export const SET_ISNTLOGIN = "LOGIN_VRM/SET_ISNTLOGIN";
const SET_TOKEN = "LOGIN_VRM/SET_TOKEN";
// const SET_ISLOGIN = "LOGIN_VRM/SET_ISLOGIN";

const REDUCER_NAME = "loginVRM";

export const setIsntLogin = createAction(SET_ISNTLOGIN);
export const setToken = createAction(SET_TOKEN);
// export const setIsLogin = createAction(SET_ISLOGIN);


const initialState = {islogin: false, username: "", idUser: null, headerWithToken: {} };

// const targetUrl = "https://vrmapi.victronenergy.com";
// const authApi = "/v2/auth/login";


export default handleActions({
    [setIsntLogin] : (state, { payload }) =>  initialState,
    [setToken] : (state, { payload }) => payload,
    // [setIsLogin] : (state, { payload }) => payload,
}, initialState);

export const isLoginSelector = state => state[REDUCER_NAME];