import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { loginShowSelector, setSwith } from "../reducers/loginField";
import { loginPassSelector, setLogin, setParol} from "../reducers/loginInput";
import { setIsntLogin, isLoginSelector } from "../reducers/loginVRM";
import LoginField from "../components/login-field";
import ShowOnLogin from "../components/showOnlogin";
import { Button } from "@material-ui/core";
import { setInstallationObjectData } from "../reducers/installationsObjectData";



class Login extends React.Component {
    render() {
        const { showLogin, isActive, onChangeLogin, 
            onChangeParol, loginPass, isLogin, logout } = this.props; 
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
                />
                <div>
                    <ShowOnLogin 
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
    logout: PropTypes.func,
    setInstallationObjectData: PropTypes.func,
}

const mapDispatchToProps = ({
    showLogin: setSwith,
    onChangeLogin: setLogin,
    onChangeParol: setParol,
    logout: setIsntLogin,
    setInstallationObjectData: setInstallationObjectData,

});

const mapStateToProps = state => ({
    isActive: loginShowSelector(state),
    loginPass: loginPassSelector(state),
    isLogin: isLoginSelector(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
