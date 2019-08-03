import axios from "axios";
import React from "react";
import PropTypes from "prop-types";



// let headerWithToken = {};
// let idUser = null;


//APIs

const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";

export function formInstallationsApi(idUser){
    return targetUrl + `/v2/users/${idUser}/installations`;
}

// function formInstallationOwerviewApi(idSite){
//     return targetUrl + `/v2/installations/${idSite}/system-overview`;
// }


export const getInstallations = FormRequestToVRM(formInstallationsApi);

// export function getInstallations(isLogin){
//     return new Promise((resolve, reject) => {
//         getAxiosRequest(formInstallationsApi(isLogin.idUser), isLogin.headerWithToken)
//         .then(responce => {
//             console.log(responce);
//             resolve(responce);
//         })
//     });
// }

function FormRequestToVRM(formURL) {
    return (urlKey, headerWithToken) => {
        return new Promise((resolve, reject) => {
            // getAxiosRequest(formURL(urlKey, isLogin), headerWithToken)
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


export function getLoginRequest(loginPass, setToken, showLogin, isActive, setInstallations){
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
                showLogin(isActive);
                const isLogin = {islogin: true, username: loginPass.login, idUser: idUser, headerWithToken};
                getInstallations(isLogin.idUser, isLogin.headerWithToken).then((responce) => {
                    setToken(isLogin);
                    setInstallations(responce);
                });
                resolve(true);
        }})
        .catch(function(err){
            console.log(`login error: ${err}`);
            return null;
        });
    });
};







export function getAxiosRequest(url, headerWithToken){
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url: url,
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