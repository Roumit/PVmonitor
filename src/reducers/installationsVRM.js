import {handleActions, createAction} from "redux-actions";

export const SET_INSTALLATIONS = "INSTALLATIONS_VRM/SET_INSTALLATIONS";

const REDUCER_NAME = "installationsVRM";

export const setInstallations = createAction(SET_INSTALLATIONS);


const initialState = {data: {success: false}};


export default handleActions({
    [setInstallations] : (state, { payload }) => payload ,
}, initialState);

export const installationsSelector = state => state[REDUCER_NAME];