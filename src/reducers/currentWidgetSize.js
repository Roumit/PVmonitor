import { handleActions, createAction } from "redux-actions";

export const REDUCER_NAME = "currentWidgetSize";

const SET_CURRENT_WIDGET_SIZE = "CURRENT_WIDGET_SIZE/SET_SIZE";

export const setWidgetSize = createAction(SET_CURRENT_WIDGET_SIZE);

const initialState = {W: 100, H: 100, resizeX: false, resizeY: false};

export default handleActions({
    [setWidgetSize]: (state, { payload }) => {
        const newState = Object.assign({}, state);
        for (let key in payload) {
            newState[key] = payload[key];
        } 
        return newState;
    },
}, initialState);

export const currentWidgetSizeSelector = state => state[REDUCER_NAME];