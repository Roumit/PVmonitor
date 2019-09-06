
import { handleActions, createAction} from "redux-actions";


const SET_COORD = 'MOUSE_COORD/SET_COORD';

const REDUCER_NAME = 'mouseCoordinates';

export const setCoord = createAction(SET_COORD);

const initialState = {in:true, X: 0, Y: 0, dragX: 0, dragY: 0};

export default handleActions({
    [setCoord]: (state, { payload }) => {
        const newState = Object.assign({}, state);
        for (let key in payload) {
            newState[key] = payload[key];
        } 
        return newState;
    },
}, initialState);

export const mouseCoordSelector = state => state[REDUCER_NAME];