import {handleActions, createAction} from "redux-actions";

export const READ_LOCAL_STORAGE = "READ_LOCAL_STORAGE/READ_LOCAL_STORAGE";

// const REDUCER_NAME = "readLocalStorage";

export const readLocalStorage = createAction(READ_LOCAL_STORAGE);

// const initialState = '';

// export default handleActions({
//     [readLocalStorage] : (state, { payload }) => ({...payload}),
// }, initialState);

// export const readLocalStorageSelector = state => state[REDUCER_NAME];
