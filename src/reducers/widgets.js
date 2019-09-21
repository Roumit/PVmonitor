import { handleActions, createAction} from "redux-actions";


const SET_WIDGETS = 'WIDGETS/SET_WIDGETS';
// const DELETE_WIDGETS = 'WIDGETS/DELETE_WIDGETS';
const ADD_WIDGET = 'WIDGETS/ADD_WIDGET';
const EDIT_WIDGET = 'WIDGETS/EDIT_WIDGET';

const REDUCER_NAME = 'widgets';

export const setWidgets = createAction(SET_WIDGETS);
// export const deleteWidgets = createAction(DELETE_WIDGETS);
export const addWidgets = createAction(ADD_WIDGET);
export const editWidget = createAction(EDIT_WIDGET);

const initialState = [
    {X: 0, Y: 0, W: '200px', H: '100px', content:""},
];

export default handleActions({
    [setWidgets]: (state, {payload}) => (payload),
    [addWidgets]: (state, {payload}) => [...state, payload],
    [editWidget]: (state, {payload}) => {
        const newState = [...state];
        for (let key in payload.widgets) {
            newState[payload.id][key] = payload.widgets[key];
        }
        return newState;
    },
}, initialState);

export const widgetsSelector = state => state[REDUCER_NAME];