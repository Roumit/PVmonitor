import { setCookie } from "../containers/cookieGetSet";
import { setLocalStorage } from "../containers/localStorageReadWrite";
import { SET_INSTALLATIONS } from "../reducers/installationsVRM";
import { SET_ISNTLOGIN } from "../reducers/loginVRM";

const filterToLocalStorageLog = ["loginVRM", "installationsVRM"];

// const filterToCookieLog = ["loginVRM"];

let count = 0;

export const  logToLocalStorage = state => next => action => {
    const returnValue = next(action);
    console.log(action);
    const newState = state.getState();
    if (action.type === SET_INSTALLATIONS || action.type === SET_ISNTLOGIN) {
        console.log("-- log state to Local Storage -- #", count++);
        filterToLocalStorageLog.map((key) => {
            if (newState[key]) {
                console.log("Data to log: ", newState[key]);
                setLocalStorage(key, JSON.stringify(newState[key]));
            }
        });
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