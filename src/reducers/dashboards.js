import { handleActions, createAction} from "redux-actions";


export const SET_DASHBOARD = 'DASHBOARDS/SET_DASHBOARD';
const LOAD_DASHBOARDS = 'DASHBOARDS/LOAD_DASHBOARDS';
const EDIT_DASHBOARD = 'DASHBOARDS/EDIT_DASHBOARD';
const DELETE_DASHBOARD = 'DASHBOARDS/DELETE_DASHBOARD';

const REDUCER_NAME = 'dashboards';

export const setDashboard = createAction(SET_DASHBOARD);
export const loadDashboards = createAction(LOAD_DASHBOARDS);
export const editDashboard = createAction(EDIT_DASHBOARD);
export const deleteDashboard = createAction(DELETE_DASHBOARD);

const initialState = [];

export default handleActions({
    [setDashboard]: (state, { payload })  => {
        let newState = [...state];
        newState[payload.id] = {dashboard: payload.dashboard,
        name: payload.name, id: payload.id};
        return newState;
    },
    [loadDashboards]: (state, { payload }) => payload,
    [deleteDashboard]: (state, { payload }) => {
        let newState = [...state];
        newState[payload] = "";
        return newState;
    },
}, initialState);

export const dashboardsSelector = state => state[REDUCER_NAME];