import { handleActions, createAction} from "redux-actions";


const SET_DASHBOARD_ELEMENT = 'NEW_DASHBOARD/SET_DASHBOARD_ELEMENT';
const SET_DASHBOARD = 'NEW_DASHBOARD/SET_DASHBOARD';
const EDIT_DASHBOARD_ELEMENT = 'NEW_DASHBOARD/EDIT_DASHBOARD_ELEMENT';
const DELETE_DASHBOARD_ELEMENT = 'NEW_DASHBOARD/DELETE_DASHBOARD_ELEMENT';
const CLEAR_DASHBOARD = 'NEW_DASHBOARD/CLEAR_DASHBOARD';

const REDUCER_NAME = 'newDashboard';

export const setElemToNewDashboard = createAction(SET_DASHBOARD_ELEMENT);
export const setNewDashboard = createAction(SET_DASHBOARD);
export const editElemInNewDashboard = createAction(EDIT_DASHBOARD_ELEMENT);
export const deleteElemInNewDashboard = createAction(DELETE_DASHBOARD_ELEMENT);
export const clearNewDashboard = createAction(CLEAR_DASHBOARD);

const initialState = [];

export default handleActions({
    [setElemToNewDashboard]: (state, { payload }) => [...state, payload],
    [setNewDashboard]: (state, { payload }) => payload,
    [clearNewDashboard]: (state, { payload }) => initialState,
    [editElemInNewDashboard]: (state, { payload }) => {
        let newState = [...state];
        newState[payload.id].element.name = payload.value;
        return newState;
    },
    [deleteElemInNewDashboard]: (state, { payload }) => {
        let newState = [...state];
        newState[payload] = "";
        return newState;
    },
}, initialState);

export const newDashboardSelector = state => state[REDUCER_NAME];