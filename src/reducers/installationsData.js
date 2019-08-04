import {handleActions, createAction} from "redux-actions";
import {testLogin, testPass} from "./testLoginPass";

const SET_DATA = "INSTALLATIONS_DATA/SET_DATA";
const RESET = "INSTALLATIONS_DATA/RESET";

const REDUCER_NAME = "installationsData";

export const setInstallationData = createAction(SET_DATA);
export const resetInstallationsData = createAction(RESET);

const initialState = {};

export default handleActions({
    [setInstallationData] : (state, { payload }) => console.log(state) || Object.assign({}, state, payload),
    [resetInstallationsData] : (state, { payload }) => initialState,
}, initialState);

export const instDataSelector = state => state[REDUCER_NAME];