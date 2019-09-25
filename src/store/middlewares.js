import Thunk from "redux-thunk";
// import { setCookie } from "../containers/cookieGetSet";
import { useDispatch } from "react-redux";
import { setLocalStorage } from "../models/localStorageReadWrite";
import { SET_INSTALLATIONS, setInstallations } from "../reducers/installationsVRM";
import { SET_ISNTLOGIN, SET_TOKEN, setToken } from "../reducers/loginVRM";
import { SET_DASHBOARD, loadDashboards } from "../reducers/dashboards";
import { SET_DATA, setInstallationObjectData } from "../reducers/installationsObjectData";
import { READ_LOCAL_STORAGE } from "../reducers/readLocalSrorage";
import writeStoreFromLocalStorage from "../models/localStorageRead";

const filterToLocalStorageLog = {
    [SET_ISNTLOGIN]: "loginVRM",
    [SET_TOKEN]: "loginVRM", 
    [SET_INSTALLATIONS]: "installationsVRM", 
    [SET_DATA]: "installationsObjectData",
    [SET_DASHBOARD]: "dashboards"
};


const actionsToLocalStorage = [SET_INSTALLATIONS, SET_ISNTLOGIN, SET_TOKEN, SET_DATA, SET_DASHBOARD];

export const logToLocalStorage = state => next => action => {
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


const keysToTakeFromLocalStorage = [
    {
        key: "loginVRM",
        Dispatch: setToken
    },
    {
        key: "installationsVRM",
        Dispatch: setInstallations
    },
    {
        key: "dashboards",
        Dispatch: loadDashboards
    },
    {
        key: "installationsObjectData",
        Dispatch: setInstallationObjectData
    }
];



export const takeFromLocalStorage = state => next => action => {
    const returnValue = next(action);
    if (action.type === READ_LOCAL_STORAGE) {
        keysToTakeFromLocalStorage.forEach((el) => {
            const data = writeStoreFromLocalStorage(el.key)
            if (data) {
                state.dispatch(el.Dispatch(data));
            }
        });
        
    }
    
    return returnValue;
}



const createMiddlewares = () => [
    Thunk,
    logToLocalStorage,
    takeFromLocalStorage,
]

export default createMiddlewares;