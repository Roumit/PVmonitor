import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { isLoginSelector } from "../reducers/loginVRM";
import InstallationList from "../components/installations-list";
import { setInst, installationSelector } from "../reducers/selectedInst";
import InstallationDetails from "./installationDetails";
import { installationsSelector, setInstallations } from "../reducers/installationsVRM";
import { updateTimerId, updateInstallations } from "../store/apiVRM";
import { setInstallationObjectData } from "../reducers/installationsObjectData";




class Installations extends React.Component {
    
    componentWillUnmount(){
        clearInterval(updateTimerId);
        clearTimeout(updateTimerId);
    };

    componentWillMount(){
        this.props.updateInstallations(this.props.isLogin, 20000);
    };

    render(){
        const { isLogin, installationResponce, selectInst, selectedInst } = this.props;

        if (!isLogin.islogin) {
            return (
                <div className="inner-warning">Please login first!</div>
            );
        }

        return (
            <div className="installations">
                <Redirect push to="/sites" />
                <InstallationList 
                installationResponce={installationResponce}
                selectInst={selectInst} 
                selectedInst={selectedInst}
                isLogin={isLogin} />
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
    setInstallations: PropTypes.func,
    setInstallationObjectData: PropTypes.func,
    updateInstallations: PropTypes.func,
};

const mapStateToProps = state => ({
    isLogin: isLoginSelector(state),
    installationResponce: installationsSelector(state),
    selectedInst: installationSelector(state),
});

const mapDispatchToProps = {
    selectInst: setInst,
    setInstallations: setInstallations, 
    setInstallationObjectData: setInstallationObjectData,
    updateInstallations: updateInstallations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Installations);

