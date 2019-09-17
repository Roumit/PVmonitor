import axios from "axios";
import React from "react";
import { setToken } from "../reducers/loginVRM";
import { setInstallations } from "../reducers/installationsVRM";
import { setInstallationObjectData } from "../reducers/installationsObjectData";
import { setSwith as showLogin } from "../reducers/loginField";
import { loginPassSelector } from "../reducers/loginInput";
import { store } from "../index.js";


//APIs

const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";

export function formInstallationsApi(idUser){
    return `${targetUrl}/v2/users/${idUser}/installations?extended=1`;
}

function formInstallationOwerviewApi(idSite){
    return `${targetUrl}/v2/installations/${idSite}/system-overview`;
}


export const getInstallations = FormRequestToVRM(formInstallationsApi);

export const getInstallationData = FormRequestToVRM(formInstallationOwerviewApi)


function FormRequestToVRM(formURL) {
    return (urlKey, headerWithToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method:'get',
                url: formURL(urlKey),
                headers: headerWithToken
            })
            .then((responce) => {
                resolve(responce);
            })
            .catch((err) => {
                reject(err);
            })
        });
    };
};


export function getLoginRequest() {
    const loginPass = loginPassSelector(store.getState());
    // console.log(loginPass);
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
                store.dispatch(showLogin());
                const isLogin = {islogin: true, username: loginPass.login, idUser: idUser, headerWithToken};
                getInstallations(isLogin.idUser, isLogin.headerWithToken).then((responce) => {
                    store.dispatch(setToken(isLogin));
                    store.dispatch(setInstallations(responce));
                    if (responce.data && responce.data.records) {
                        CreateInstallationsDataObject(responce);
                    }
                });
                resolve(true);
        }})
        .catch(function(err){
            console.log(`login error: ${err}`);
            return null;
        });
    });
};



export function CreateInstallationsDataObject(installationResponce) { //, setInstallationObjectData_1) {
    const newDataObj = {};
    installationResponce.data.records.map((e) => {
        const params = {siteName: e.name};
        e.extended.map((data) => {
            params[data.idDataAttribute || data.code] = { name: data.description, value: data.formattedValue};
            return null;
        });
        newDataObj[e.idSite] = params;
        return null;
    });
    store.dispatch(setInstallationObjectData(newDataObj));
    return newDataObj;
};


export let updateTimerId = null;

export function updateInstallations(isLogin, setInstallations, setInstObj, time=10000){
    updateTimerId = setTimeout(() => {
        updateTimerId = setInterval(() => {
            if (isLogin.islogin) {
                getInstallations (isLogin.idUser, isLogin.headerWithToken).then((responce) => {
                    // console.log("--- Auto request ---");
                    setInstallations(responce);
                    if (setInstObj) {
                        CreateInstallationsDataObject(responce, setInstObj);
                    }

                });
            }
        }, time);
    }, time);
};


