import React from "react";
import PropTypes from "prop-types";

import { getLoginRequest,  } from "../containers/apiVRM";
import { Button, TextField } from "@material-ui/core";



const loginPlaceholder = "login or email:";
const parolPlaceholder = "password";
const buttonText = "Login"


const passInput = React.createRef();

const LoginField = ({ isActive, onChangeLogin, onChangeParol, 
    loginPass }) => {
    if (!isActive) {
        return null;
    }
    return (
        <div>
            <div>
                <TextField
                autoFocus = {true}
                placeholder={loginPlaceholder} 
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
                placeholder={parolPlaceholder}
                onChange={({target: { value }}) => onChangeParol(value)}
                onKeyDown={ e => {
                    if (e.keyCode === 13) {
                        getLoginRequest()
                    }
                }} 
                value={loginPass.pass} />
           </div>
            <div>
                <Button
                color="primary"
                onClick={() => getLoginRequest() }
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




