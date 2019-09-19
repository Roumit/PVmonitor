import React from "react";

import { getLoginRequest,  } from "../containers/apiVRM";
import { Button, TextField } from "@material-ui/core";


const loginPlaceholder = "login or email:";
const parolPlaceholder = "password";
const buttonText = "Login"


const passInput = React.createRef();

const LoginField = ({ onChangeLoginPass, isLogin }) => {
    if (isLogin.islogin) {
        return null;
    }
    return (
        <div>
            <div>
                <TextField
                autoFocus = {true}
                placeholder={loginPlaceholder} 
                onChange={({target: { value }}) => onChangeLoginPass({ login: value })} 
                onKeyDown={ e => {
                    if (e.keyCode === 13) {
                        passInput.current.focus();
                    }
                }}
                value={isLogin.login} />
            </div>
           <div>
                <TextField
                inputRef = {passInput}
                type="password"
                placeholder={parolPlaceholder}
                onChange={({target: { value }}) => onChangeLoginPass({ pass: value })}
                onKeyDown={ e => {
                    if (e.keyCode === 13) {
                        getLoginRequest()
                    }
                }} 
                value={isLogin.pass} />
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


export default LoginField;

