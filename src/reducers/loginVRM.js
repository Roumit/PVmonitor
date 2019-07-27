import {handleActions, createAction} from "redux-actions";
import axios from "axios";

const SET_ISNTLOGIN = "LOGIN_VRM/SET_ISLOGIN";
const GET_TOKEN = "LOGIN_VRM/GET_TOKEN";
const SET_TOKEN = "LOGIN_VRM/SET_TOKEN";

const REDUCER_NAME = "loginVRM";

export const setIsntLogin = createAction(SET_ISNTLOGIN);
export const getToken = createAction(GET_TOKEN);
export const setToken = createAction(SET_TOKEN);


const initialState = {islogin: false, username: "", idUser: null, headerWithToken: {} };

const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";

export function getLoginRequest(loginPass){
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            url: targetUrl + authApi,
            data: `{"username": "${loginPass.login}", "password": "${loginPass.pass}"}`
        })
        .then(response => {
            if (response.status === 200){
                const headerWithToken = {'X-Authorization' : 'Bearer ' + response.data.token};
                const idUser = response.data.idUser;
                // console.log(idUser);
                console.log({islogin: true, username: loginPass.login, idUser: idUser, headerWithToken});
                resolve({islogin: true, username: loginPass.login, idUser: idUser, headerWithToken});
        }})
        .catch(function(err){
            console.log(`login error: ${err}`);
            return null;
        });
    });
}

export default handleActions({
    [setIsntLogin] : (state, { payload }) => initialState,
    [getToken] : (state, { payload }) => getLoginRequest(payload),
    [setToken] : (state, { payload }) => payload,
}, initialState);

export const isLoginSelector = state => state[REDUCER_NAME];