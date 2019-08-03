
import { handleActions, createAction} from "redux-actions";


const SET_INST = 'SELECTED_INST/SET_INST';

const REDUCER_NAME = 'selectedInst';

export const setInst = createAction(SET_INST);

const initialState = null;

export default handleActions({
    [setInst]: (state, {payload}) => (payload),
}, initialState);

export const installationSelector = state => state[REDUCER_NAME];