import React from "react";
import PropTypes from "prop-types";

import { getLoginRequest,  } from "../containers/apiVRM";


const loginPlaceholder = "логин или email";
const parolPlaceholder = "пароль";
const buttonText = "Login"


const LoginField = ({isActive, onChangeLogin, onChangeParol, loginPass, toLogin, showLogin, setInstallations}) => {
    if (!isActive) {
        return null;
    }
    return (
        <div>
            <div>
                <input 
                    placeholder={loginPlaceholder} 
                    onChange={({target: { value }}) => onChangeLogin(value)} 
                    value={loginPass.login} />
            </div>
           <div>
                <input 
                    placeholder={parolPlaceholder}
                    onChange={({target: { value }}) => onChangeParol(value)} 
                    value={loginPass.pass} />
           </div>
            <div>
                <button onClick={() => getLoginRequest(loginPass, toLogin, showLogin, isActive, setInstallations) }>{buttonText}</button>
            </div>
            
        </div>
    );
};

LoginField.propTypes = {
    isActive: PropTypes.bool,
    onChange: PropTypes.func,
    loginPass: PropTypes.object,
    toLogin: PropTypes.func
};

export default LoginField;




