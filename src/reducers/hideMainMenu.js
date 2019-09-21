import { handleActions, createAction } from "redux-actions";

const REDUCER_NAME = "hideMainMenu";

const TOGGLE_MAIN_MENU = "HIDE_MAIN_MENU/TOGGLE_MAIN_MENU";

export const toggleMainMenu = createAction(TOGGLE_MAIN_MENU);

const initialState = true;

export default handleActions({
    [toggleMainMenu]: (state, { payload }) => (state)? false : true,
}, initialState);

export const hideMainMenuSelector = state => state[REDUCER_NAME]; 
   