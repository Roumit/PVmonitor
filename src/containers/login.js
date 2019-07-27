import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { loginShowSelector, setSwith } from "../reducers/loginField";
import { loginPassSelector, setLogin, setParol} from "../reducers/loginInput";
import { setIsntLogin, setToken, isLoginSelector } from "../reducers/loginVRM";
import LoginField from "../components/login-field";

// import { getLoginRequest } from "./apiVRM";

const ShowUsername = ({ isLogin }) => {
    if (isLogin.islogin) {
        return "login as: " + isLogin.username;
    }
    return null;
};

class Login extends React.Component {
    render() {
        const { showLogin, isActive, onChangeLogin, onChangeParol, loginPass, isLogin, toLogin } = this.props; 
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
                    <ShowUsername isLogin={isLogin} />
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
    isLogin: PropTypes.object
}

const mapDispatchToProps = ({
    showLogin: setSwith,
    onChangeLogin: setLogin,
    onChangeParol: setParol,
    toLogin: setToken,

});

const mapStateToProps = state => ({
    isActive: loginShowSelector(state),
    loginPass: loginPassSelector(state),
    isLogin: isLoginSelector(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
