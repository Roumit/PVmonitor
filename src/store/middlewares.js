import { setCookie } from "../containers/cookieGetSet";
import { setLocalStorage } from "../containers/localStorageReadWrite";
import { SET_INSTALLATIONS } from "../reducers/installationsVRM";
import { SET_ISNTLOGIN } from "../reducers/loginVRM";
import { SET_DASHBOARD } from "../reducers/dashboards";
import { SET_DATA } from "../reducers/installationsObjectData";

const filterToLocalStorageLog = ["loginVRM", "installationsVRM", "installationsObjectData"];

// const filterToCookieLog = ["loginVRM"];

let count = 0;

const actionsToLocalStorage = [SET_INSTALLATIONS, SET_ISNTLOGIN, SET_DATA]

export const  logToLocalStorage = state => next => action => {
    const returnValue = next(action);
    console.log(action);
    const newState = state.getState();
    if (actionsToLocalStorage.indexOf(action.type) !== -1) {
        console.log("-- log state to Local Storage -- #", count++);
        filterToLocalStorageLog.map((key) => {
            if (newState[key]) {
                console.log("Data to log: ", newState[key]);
                setLocalStorage(key, JSON.stringify(newState[key]));
            }
        });
    }

    if (action.type === SET_DASHBOARD) {
        console.log("-- log state to Local Storage -- #", count++);
        console.log(newState["dashboards"]);
        setLocalStorage("dashboards", JSON.stringify(newState["dashboards"]));
    }
    
    return returnValue;
}

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
    logToLocalStorage
]

export default createMiddlewares;