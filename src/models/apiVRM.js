import axios from "axios";
import React from "react";
import { setToken } from "../reducers/loginVRM";
import { setInstallations } from "../reducers/installationsVRM";
import { setInstallationObjectData } from "../reducers/installationsObjectData";
import { setTimer } from "../reducers/updateTimer";


//APIs

const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";

export function formInstallationsApi(idUser){
    return `${targetUrl}/v2/users/${idUser}/installations?extended=1`;
}

// function formInstallationOwerviewApi(idSite){
//     return `${targetUrl}/v2/installations/${idSite}/system-overview`;
// }


export const getInstallations = FormRequestToVRM(formInstallationsApi, setInstallations);


function FormRequestToVRM(formURL, action) {
    return (urlKey, headerWithToken, afterFunc) => {
        return function(dispatch) {
            axios({
                method:'get',
                url: formURL(urlKey),
                headers: headerWithToken
            })
            .then(
                response => {
                    dispatch(action(response));
                    dispatch(afterFunc(response));
                },
                error => console.log(error)
            )
        };
    }
};



export function getLoginRequest(loginPass){
    return function(dispatch) {
        axios({
                method:'post',
                url: targetUrl + authApi,
                data: `{"username": "${loginPass.login}", "password": "${loginPass.pass}"}`
        })
        .then( response => {
                if (response.status === 200){
                    const headerWithToken = {'X-Authorization' : 'Bearer ' + response.data.token};
                    const idUser = response.data.idUser;
                    const isLogin = {
                        islogin: true,
                        username: loginPass.login,
                        idUser: idUser,
                        headerWithToken
                    };
                    dispatch(setToken(isLogin));
                    dispatch(getInstallations(isLogin.idUser, isLogin.headerWithToken, 
                        CreateInstallationsDataObject));
                }
            },
            error => {
                console.log(error);
                return null;
            }
        );
    };
};


export function CreateInstallationsDataObject(installationResponse) {
    return function(dispatch) {
        if (installationResponse.data && installationResponse.data.records) {
            const newDataObj = {};
            installationResponse.data.records.forEach((e) => {
                const params = {siteName: e.name};
                e.extended.forEach((data) => {
                    params[data.idDataAttribute || data.code] = { name: data.description, value: data.formattedValue};
                });
                newDataObj[e.idSite] = params;
            });
            dispatch(setInstallationObjectData(newDataObj));
            return newDataObj;
        }
        return null;
    }; 
};



export function updateInstallations(isLogin, time=10000){
    return function(dispatch) {
        dispatch(setTimer(setTimeout(() => {
            dispatch(setTimer(setInterval(() => {
                if (isLogin.islogin) {
                    // console.log("=== auto request ===");
                    dispatch(getInstallations(isLogin.idUser, isLogin.headerWithToken, 
                        CreateInstallationsDataObject));
                }
            }, time)));
        }, time)));
    }
};
