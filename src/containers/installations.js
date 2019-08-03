import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { isLoginSelector } from "../reducers/loginVRM";
import InstallationList from "../components/installations-list";
import { setInst, installationSelector } from "../reducers/selectedInst";
import InstallationDetails from "./installationDetails";
import { installationsSelector } from "../reducers/installationsVRM";

class Installations extends React.Component {
    render(){
        const { isLogin, installationResponce, selectInst } = this.props;

        if (!isLogin.islogin) {
            console.log(isLogin);
            return null;
        }
        return (
            <div className="installations">
                <InstallationList 
                installationResponce={installationResponce}
                selectInst={selectInst} />
                <InstallationDetails />
            </div>
        )
        
    };
};

Installations.propTypes = {
    isLogin: PropTypes.object,
    installationResponce: PropTypes.object,
    selectInst: PropTypes.func,
};

const mapStateToProps = state => ({
    isLogin: isLoginSelector(state),
    installationResponce: installationsSelector(state),
});

const mapDispatchToProps = {
    selectInst: setInst,
};

export default connect(mapStateToProps, mapDispatchToProps)(Installations);

