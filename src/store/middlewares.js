import Thunk from "redux-thunk";
// import { setCookie } from "../containers/cookieGetSet";
import { setLocalStorage } from "../containers/localStorageReadWrite";
import { SET_INSTALLATIONS } from "../reducers/installationsVRM";
import { SET_ISNTLOGIN, SET_TOKEN } from "../reducers/loginVRM";
import { SET_DASHBOARD } from "../reducers/dashboards";
import { SET_DATA } from "../reducers/installationsObjectData";

const filterToLocalStorageLog = {
    [SET_ISNTLOGIN]: "loginVRM",
    [SET_TOKEN]: "loginVRM", 
    [SET_INSTALLATIONS]: "installationsVRM", 
    [SET_DATA]: "installationsObjectData",
    [SET_DASHBOARD]: "dashboards"
};


const actionsToLocalStorage = [SET_INSTALLATIONS, SET_ISNTLOGIN, SET_TOKEN, SET_DATA, SET_DASHBOARD];

export const  logToLocalStorage = state => next => action => {
    const returnValue = next(action);
    // console.log(action);
    const newState = state.getState();
    if (actionsToLocalStorage.indexOf(action.type) !== -1) {
        // console.log("-- log state to Local Storage -- ");
        setLocalStorage(filterToLocalStorageLog[action.type], 
            JSON.stringify(newState[filterToLocalStorageLog[action.type]]));
            // console.log("Data to log: ", newState[filterToLocalStorageLog[action.type]]);
    }
    
    return returnValue;
}

// const filterToCookieLog = ["loginVRM"];

// export const  logToCookie = state => next => action => {
//         const returnValue = next(action);
//         const newState = state.getState();
//         console.log('1: ', newState);
//         // console.log('2: ', newState.loginVRM);
//         filterToCookieLog.map((key) => {
//             if (newState[key]) {
//                 console.log("cookie tolog: ", newState[key]);
//                 setCookie(key, JSON.stringify(newState[key]), {"max-age": 0});
//             }
//         })
//         // console.log(document.cookie);
//         return returnValue;
// }


const createMiddlewares = () => [
    // logToCookie,
    Thunk,
    logToLocalStorage
]

export default createMiddlewares;