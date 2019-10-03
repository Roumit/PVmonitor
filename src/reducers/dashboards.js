import { handleActions, createAction} from "redux-actions";


export const SET_DASHBOARD = 'DASHBOARDS/SET_DASHBOARD';
const LOAD_DASHBOARDS = 'DASHBOARDS/LOAD_DASHBOARDS';
const EDIT_DASHBOARD = 'DASHBOARDS/EDIT_DASHBOARD';
const DELETE_DASHBOARD = 'DASHBOARDS/DELETE_DASHBOARD';
const EDIT_ELEM_IN_CONSTRUCTOR = 'DASHBOARDS/EDIT_ELEM_IN_CONSTRUCTOR';
const DELETE_ELEM_IN_CONSTRUCTOR = 'DASHBOARDS/DELETE_ELEM_IN_CONSTRUCTOR';
const SET_CONSTRUCTOR_DASHBOARD = 'DASHBOARDS/SET_CONSTRUCTOR_DASHBOARD';
const CLEAR_CONSTRUCTOR_DASHBOARD = 'DASHBOARDS/CLEAR_CONSTRUCTOR_DASHBOARD';
const SET_ELEM_TO_CONSTRUCTOR = 'DASHBOARDS/SET_ELEM_TO_CONSTRUCTOR';

const REDUCER_NAME = 'dashboards';

export const setDashboard = createAction(SET_DASHBOARD);
export const loadDashboards = createAction(LOAD_DASHBOARDS);
export const editDashboard = createAction(EDIT_DASHBOARD);
export const deleteDashboard = createAction(DELETE_DASHBOARD);
export const editElemInConstructor = createAction(EDIT_ELEM_IN_CONSTRUCTOR);
export const setConstructorDashboard = createAction(SET_CONSTRUCTOR_DASHBOARD);
export const clearConstructorDashboard = createAction(CLEAR_CONSTRUCTOR_DASHBOARD);
export const deleteElemInConstructor = createAction(DELETE_ELEM_IN_CONSTRUCTOR);
export const setElemToConstructor = createAction(SET_ELEM_TO_CONSTRUCTOR);

const initialState = { constructor: { dashboard: [] }};

export default handleActions({
    [setDashboard]: (state, { payload })  => ({ ...state, [payload.id]: { name: payload.name, dashboard: [...payload.dashboard] } }),
    // {
        // let newState = [...state];
        // newState[payload.id] = { ...payload };
        // return newState;
    // },
    [loadDashboards]: (state, { payload }) => ({ ...payload }),
    [deleteDashboard]: (state, { payload }) => ({ ...state, [payload.id]: "" }),
    // {
    //     let newState = [...state];
    //     newState[payload] = "";
    //     return newState;
    // },
    [editElemInConstructor]: (state, { payload }) => {
        let newState = { ...state };
        newState.constructor.dashboard[payload.id].element = { ...state.constructor.dashboard[payload.id].element, ...payload.element }
        return newState;

        // let newState = [...state];
        // newState[payload.id].element = { ...state[payload.id].element, ...payload.element }
        // return newState;
    },
    [clearConstructorDashboard]: (state, { payload }) => ({ ...state, constructor: { dashboard: [] } }),
    [setConstructorDashboard]: (state, { payload }) => ({ ...state, id: payload, constructor: state[payload] }),
    [deleteElemInConstructor]: (state, { payload }) => {
        let newState = { ...state };
        newState.constructor.dashboard[payload].delete = true;
        return newState;
    },
    [setElemToConstructor]: (state, { payload }) => ({ ...state, constructor: { ...state.constructor, dashboard: [...state.constructor.dashboard, payload] } }),
}, initialState);

export const dashboardsSelector = state => state[REDUCER_NAME];
