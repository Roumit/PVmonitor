import { handleActions, createAction } from "redux-actions";

export const REDUCER_NAME = "currentWidgetSize";

const SET_CURRENT_WIDGET_SIZE = "CURRENT_WIDGET_SIZE/SET_SIZE";
const CLEAR_CURRENT_WIDGET_SIZE = "CURRENT_WIDGET_SIZE/CLEAR_SIZE";

export const setWidgetSize = createAction(SET_CURRENT_WIDGET_SIZE);
export const clearWidgetSize = createAction(CLEAR_CURRENT_WIDGET_SIZE);

const initialState = {X: -100, Y: 0, W: 50, H: 50, resizeX: false, resizeY: false, move: false};

export default handleActions({
    [setWidgetSize]: (state, { payload }) => ({ ...state, ...payload }),
    [clearWidgetSize]: (state, { payload }) => initialState,
}, initialState);

export const currentWidgetSizeSelector = state => state[REDUCER_NAME];
