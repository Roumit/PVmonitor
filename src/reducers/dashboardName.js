import { handleActions, createAction } from "redux-actions";

const REDUCER_NAME = "dashboardName";

const SET_NAME = "DASHBOARD_NAME/SET_NAME";
const CLEAR_NAME = "DASHBOARD_NAME/CLEAR_NAME";

export const setDashboardName = createAction(SET_NAME);
export const clearDashboardName = createAction(CLEAR_NAME);

const initialState = "newDashboard";

export default handleActions({
    [setDashboardName]: (state, { payload }) => payload,
    [clearDashboardName]: (state, { payload }) => initialState,
}, initialState);

export const dashboardNameSelector = state => state[REDUCER_NAME];
