import axios from "axios";
import React from "react";
import PropTypes from "prop-types";



// let headerWithToken = {};
// let idUser = null;


//APIs

const targetUrl = "https://vrmapi.victronenergy.com";
const authApi = "/v2/auth/login";

// export function formInstallationsApi(){
//     return targetUrl + `/v2/users/${idUser}/installations`;
// }

// function formInstallationOwerviewApi(idSite){
//     return targetUrl + `/v2/installations/${idSite}/system-overview`;
// }


// export function getInstallations(){
//     return new Promise((resolve, reject) => {
//         getAxiosRequest(formInstallationsApi()).then(response => resolve(response))
//     });
// }


export function getLoginRequest(loginPass, setToken){
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
                setToken({islogin: true, username: loginPass.login, idUser: idUser, headerWithToken});
                resolve(true);
        }})
        .catch(function(err){
            console.log(`login error: ${err}`);
            return null;
        });
    });
};





// export function getAxiosRequest(url){
//     return new Promise((resolve, reject) => {
//         axios({
//             method:'get',
//             url: url,
//             headers: headerWithToken
//         })
//         .then((responce) => {
//             resolve(responce);
//         })
//         .catch((err) => {
//             reject(err);
//         })
//     });
// };