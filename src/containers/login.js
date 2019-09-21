import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { setIsntLogin, isLoginSelector, setToken } from "../reducers/loginVRM";
import LoginField from "../components/login-field";
import ShowOnLogin from "../components/showOnlogin";
// import { setInstallationObjectData } from "../reducers/installationsObjectData";

import { getLoginRequest,  } from "../store/apiVRM";



class Login extends React.Component {
    render() {
        const { onChangeLoginPass, isLogin, logout, loginRequest } = this.props; 
        return(
            <div className="login">
                <LoginField 
                onChangeLoginPass={onChangeLoginPass}
                isLogin={isLogin}
                logout={logout}
                loginRequest={loginRequest} />
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
    onChangeLoginPass: PropTypes.func,
    isLogin: PropTypes.object,
    logout: PropTypes.func,
    // setInstallationObjectData: PropTypes.func,
    loginRequest: PropTypes.func
}

const mapDispatchToProps = ({
    onChangeLoginPass: setToken,
    // onChangeParol: setParol,
    logout: setIsntLogin,
    // setInstallationObjectData: setInstallationObjectData,
    loginRequest: getLoginRequest,
});

const mapStateToProps = state => ({
    isLogin: isLoginSelector(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
