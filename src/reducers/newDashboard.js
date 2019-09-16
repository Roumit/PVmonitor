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

const initialState = [
    {
        element: {
            type: 'widget',
            size: {
                X: 0,
                Y: 0,
                H: 100,
                W: 200,
            },
            X: 0,
            Y: 0,
        }
    },
    {
        element: {
            type: 'widget',
            size: {
                X: 600,
                Y: 300,
                H: 100,
                W: 200,
            },
            X: 0,
            Y: 0,
        }
    }
]

    

export default handleActions({
    [setElemToNewDashboard]: (state, { payload }) => [...state, payload],
    [setNewDashboard]: (state, { payload }) => payload,
    [clearNewDashboard]: (state, { payload }) => initialState,
    [editElemInNewDashboard]: (state, { payload }) => {
        let newState = [...state];
        for (let key in payload.element) {
            newState[payload.id].element[key] = payload.element[key];
        }
        console.log(newState);
        return newState;
    },
    [deleteElemInNewDashboard]: (state, { payload }) => {
        let newState = [...state];
        newState[payload].delete = true;
        return newState;
    },
}, initialState);

export const newDashboardSelector = state => state[REDUCER_NAME];