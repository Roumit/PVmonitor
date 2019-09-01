import {handleActions, createAction} from "redux-actions";

export const SET_DATA = "INSTALLATIONS_OBJECT_DATA/SET_DATA";

const REDUCER_NAME = "installationsObjectData";

export const setInstallationObjectData = createAction(SET_DATA);

const initialState = {};

export default handleActions({
    [setInstallationObjectData] : (state, { payload }) => console.log(payload) || payload,
}, initialState);

export const instDataObjectSelector = state => state[REDUCER_NAME];