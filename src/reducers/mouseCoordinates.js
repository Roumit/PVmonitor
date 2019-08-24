
import { handleActions, createAction} from "redux-actions";


const SET_COORD = 'MOUSE_COORD/SET_COORD';

const REDUCER_NAME = 'mouseCoordinates';

export const setCoord = createAction(SET_COORD);

const initialState = {X: 0, Y: 0};

export default handleActions({
    [setCoord]: (state, { payload }) => payload,
}, initialState);

export const mouseCoordSelector = state => state[REDUCER_NAME];