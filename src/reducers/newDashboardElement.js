import { handleActions, createAction} from "redux-actions";
import { object } from "prop-types";


const SET_ELEMENT = 'NEW_ELEMENT/SET_ELEMENT';
const CLEAR_ELEMENT = 'NEW_ELEMENT/CLEAR_ELEMENT';

const REDUCER_NAME = 'newDashboardElement';

export const setElement = createAction(SET_ELEMENT);
export const clearElement = createAction(CLEAR_ELEMENT);

export const initialState = { type: 'param', idSite:"-", param: "-" };

export default handleActions({
    [setElement]: (state, { payload }) => {
        const newState = Object.assign({}, state);
        for (let key in payload) {
            newState[key] = payload[key];
        }
        return newState;
    },
        // return(
        //     { 
        //         idSite: payload.idSite || state.idSite, 
        //         param: payload.param || state.param, 
        //         name: (payload.name === "")? "" : payload.name || state.name,
        //         paramName: payload.paramName || state.paramName,
        //         value: payload.value || state.value
        //     }
        //     )},
    [clearElement]: (state, { payload }) => initialState,
}, initialState);

export const newElementSelector = state => state[REDUCER_NAME];