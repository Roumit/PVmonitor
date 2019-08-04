import React from "react";
import PropTypes from "prop-types";

import { getLoginRequest,  } from "../containers/apiVRM";
import { Button, Input, TextField } from "@material-ui/core";


const loginPlaceholder = "логин или email:";
const parolPlaceholder = "пароль:";
const buttonText = "Login"


const passInput = React.createRef();

const LoginField = ({isActive, onChangeLogin, onChangeParol, 
    loginPass, toLogin, showLogin, setInstallations}) => {
    if (!isActive) {
        return null;
    }
    return (
        <div>
            <div>
                <TextField
                autoFocus = {true}
                label={loginPlaceholder} 
                onChange={({target: { value }}) => console.log(value) || onChangeLogin(value)} 
                onKeyDown={ e => {
                    if (e.keyCode === 13) {
                        passInput.current.focus();
                    }
                }}
                value={loginPass.login} />
            </div>
           <div>
                <TextField
                inputRef = {passInput}
                type="password"
                label={parolPlaceholder}
                onChange={({target: { value }}) => onChangeParol(value)}
                onKeyDown={ e => {
                    if (e.keyCode === 13) {
                        getLoginRequest(loginPass, toLogin, showLogin, isActive, setInstallations)
                    }
                }} 
                value={loginPass.pass} />
           </div>
            <div>
                <Button
                color="primary"
                onClick={() => getLoginRequest(loginPass, toLogin, showLogin, isActive, setInstallations) }
                >{buttonText}</Button>
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




