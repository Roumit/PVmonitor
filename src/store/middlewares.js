import { setCookie } from "../containers/cookieGetSet";



export const  logger = state => next => action => {
        // console.log('0: ', action);
        // console.log('1: ', state.getState());
        const returnValue = next(action);
        const newState = state.getState();
        console.log('1: ', newState);
        console.log('2: ', newState.loginVRM);
        // console.log(setCookie);
        if (newState.loginVRM) {
            setCookie("loginVRM", JSON.stringify(newState.loginVRM));
        }
        
        return returnValue;
}

const createMiddlewares = () => [
    logger
]

export default createMiddlewares;