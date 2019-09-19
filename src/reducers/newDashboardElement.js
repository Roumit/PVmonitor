import { handleActions, createAction} from "redux-actions";


const SET_ELEMENT = 'NEW_ELEMENT/SET_ELEMENT';
const CLEAR_ELEMENT = 'NEW_ELEMENT/CLEAR_ELEMENT';

const REDUCER_NAME = 'newDashboardElement';

export const setElement = createAction(SET_ELEMENT);
export const clearElement = createAction(CLEAR_ELEMENT);

export const initialState = { type: 'param', idSite:"-", param: "-" };

export default handleActions({
    [setElement]: (state, { payload }) => ({ ...state, ...payload}),
    [clearElement]: (state, { payload }) => initialState,
}, initialState);

export const newElementSelector = state => state[REDUCER_NAME];
