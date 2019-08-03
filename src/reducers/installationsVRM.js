import {handleActions, createAction} from "redux-actions";
// import axios from "axios";

const SET_INSTALLATIONS = "INSTALLATIONS_VRM/SET_INSTALLATIONS";
// const SET_TOKEN = "LOGIN_VRM/SET_TOKEN";

const REDUCER_NAME = "installationsVRM";

export const setInstallations = createAction(SET_INSTALLATIONS);
// export const setToken = createAction(SET_TOKEN);


const initialState = {data: {success: false}};

const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";


export default handleActions({
    [setInstallations] : (state, { payload }) =>  payload ,
}, initialState);

export const installationsSelector = state => state[REDUCER_NAME];