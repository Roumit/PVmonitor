import { handleActions, createAction } from "redux-actions";

const REDUCER_NAME = "dashboardId";

const SET_ID = "DASHBOARD_NAME/SET_ID";
const CLEAR_ID = "DASHBOARD_NAME/CLEAR_ID";

export const setDashboardId = createAction(SET_ID);
export const clearDashboardId = createAction(CLEAR_ID);

const initialState = null;

export default handleActions({
    [setDashboardId]: (state, { payload }) => payload,
    [clearDashboardId]: (state, { payload }) => initialState,
}, initialState);

export const dashboardIdSelector = state => state[REDUCER_NAME];    