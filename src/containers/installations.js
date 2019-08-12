import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

import { connect } from "react-redux";

import { isLoginSelector } from "../reducers/loginVRM";
import InstallationList from "../components/installations-list";
import { setInst, installationSelector } from "../reducers/selectedInst";
import InstallationDetails from "./installationDetails";
import { installationsSelector } from "../reducers/installationsVRM";
import { setInstallationData } from "../reducers/installationsData";

class Installations extends React.Component {
    render(){
        const { isLogin, installationResponce, selectInst, selectedInst, addInstData } = this.props;

        if (!isLogin.islogin) {
            // console.log(isLogin);
            return null;
        }
        return (
            <div className="installations">
                <Redirect push to="/sites" />
                <InstallationList 
                installationResponce={installationResponce}
                selectInst={selectInst} 
                selectedInst={selectedInst}
                isLogin={isLogin}
                addInstData={addInstData} />
                <InstallationDetails />
            </div>
        )
        
    };
};

Installations.propTypes = {
    isLogin: PropTypes.object,
    installationResponce: PropTypes.object,
    selectInst: PropTypes.func,
    selectedInst: PropTypes.number,
    addInstData: PropTypes.func,
};

const mapStateToProps = state => ({
    isLogin: isLoginSelector(state),
    installationResponce: installationsSelector(state),
    selectedInst: installationSelector(state),
});

const mapDispatchToProps = {
    selectInst: setInst,
    addInstData: setInstallationData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Installations);

