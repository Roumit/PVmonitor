import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { loginShowSelector, setSwith } from "../reducers/loginField";
import { loginPassSelector, setLogin, setParol} from "../reducers/loginInput";
import { setIsntLogin, setToken, isLoginSelector } from "../reducers/loginVRM";
import { setInstallations } from "../reducers/installationsVRM";
import LoginField from "../components/login-field";
import ShowUsername from "../components/showOnlogin";
import { Button } from "@material-ui/core";



class Login extends React.Component {
    render() {
        const { showLogin, isActive, onChangeLogin, 
            onChangeParol, loginPass, isLogin, toLogin, logout, tosetInstallations } = this.props; 
        return(
            <div className="login">
                <div>
                    <Button color="secondary" onClick={() => showLogin(isActive)}>Login</Button>
                </div>
                <LoginField 
                isActive={isActive}
                onChangeLogin={onChangeLogin}
                onChangeParol={onChangeParol}
                loginPass={loginPass}
                toLogin={toLogin}
                showLogin={showLogin}
                setInstallations={tosetInstallations} 
                />
                <div>
                    <ShowUsername 
                    isLogin={isLogin}
                    logout={logout} />
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
    isLogin: PropTypes.object,
    toLogin: PropTypes.func,
    logout: PropTypes.func,
    tosetInstallations: PropTypes.func,
}

const mapDispatchToProps = ({
    showLogin: setSwith,
    onChangeLogin: setLogin,
    onChangeParol: setParol,
    toLogin: setToken,
    logout: setIsntLogin,
    tosetInstallations: setInstallations

});

const mapStateToProps = state => ({
    isActive: loginShowSelector(state),
    loginPass: loginPassSelector(state),
    isLogin: isLoginSelector(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
