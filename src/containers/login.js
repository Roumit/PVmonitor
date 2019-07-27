import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { loginShowSelector, setSwith } from "../reducers/loginField";
import { loginPassSelector, setLogin, setParol} from "../reducers/loginInput";
import {setIsLogin, isLoginSelector} from "../reducers/isLogin"
import LoginField from "../components/login-field";



class Login extends React.Component {
    render() {
        const { showLogin, isActive, onChangeLogin, onChangeParol, loginPass , toLogin, isLogin } = this.props; 
        return(
            <div className="login">
                <div>
                    <button onClick={() => showLogin(isActive)}>Login</button>
                </div>
                <LoginField 
                isActive={isActive}
                onChangeLogin={onChangeLogin}
                onChangeParol={onChangeParol}
                loginPass={loginPass}
                toLogin={toLogin}/>
                <div>
                    {(isLogin) ? "login as: " + loginPass.login: null}
                </div>
            </div>
        )
    }
}

Login.propTypes ={
    showLogin: PropTypes.func,
    isActive: PropTypes.bool,
    onChangeLogin: PropTypes.func,
    onChangeParol: PropTypes.func,
    loginPass: PropTypes.object,
    toLogin: PropTypes.func,
    isLogin: PropTypes.bool
}

const mapDispatchToProps = ({
    showLogin: setSwith,
    onChangeLogin: setLogin,
    onChangeParol: setParol,
    
});

const mapStateToProps = state => ({
    isActive: loginShowSelector(state),
    loginPass: loginPassSelector(state),
    isLogin: isLoginSelector(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
