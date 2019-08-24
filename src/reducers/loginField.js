
import { handleActions, createAction} from "redux-actions";


const SET_SWITH = 'LOGIN_FIELD/SET_SWITH';

const REDUCER_NAME = 'loginField';

export const setSwith = createAction(SET_SWITH);

const initialState = true;

export default handleActions({
    [setSwith]: (state, {payload}) => !state,
}, initialState);

export const loginShowSelector = state => state[REDUCER_NAME];