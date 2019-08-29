import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

import { connect } from "react-redux";

import { isLoginSelector } from "../reducers/loginVRM";
import InstallationList from "../components/installations-list";
import { setInst, installationSelector } from "../reducers/selectedInst";
import InstallationDetails from "./installationDetails";
import { installationsSelector, setInstallations } from "../reducers/installationsVRM";
import { setInstallationData } from "../reducers/installationsData";
import { getInstallations } from "./apiVRM";


let timerId = null;


export function updateInstallations(isLogin, setInstallations, time=10000){
    timerId = setTimeout(() => {
        timerId = setInterval(() => {
            if (isLogin.islogin) {
                getInstallations (isLogin.idUser, isLogin.headerWithToken).then((responce) => {
                    console.log("--- Auto request ---");
                    setInstallations(responce);
                });
            }
        }, time);
    }, time);
};


class Installations extends React.Component {
    componentWillUnmount(){
        console.log("componentWilUnmount");
        clearInterval(timerId);
        clearTimeout(timerId);
    };

    componentWillMount(){
        console.log("componentWilMount");
        updateInstallations(this.props.isLogin, this.props.setInstallations);
    };

    componentWillUpdate(){
        console.log("componentWilUpdate");
    };

    render(){
        const { isLogin, installationResponce, selectInst, selectedInst, addInstData } = this.props;

        if (!isLogin.islogin) {
            return (
                <div className="inner-warning">Please login first!</div>
            );
        }

        // timerId = setInterval(() => {
        //     getInstallations (isLogin.idUser, isLogin.headerWithToken).then((responce) => {
        //         console.log("--- Auto request ---");
        //         addInstData(responce);
        //     });
        // } ,10000);

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
    setInstallations: PropTypes.func,
};

const mapStateToProps = state => ({
    isLogin: isLoginSelector(state),
    installationResponce: installationsSelector(state),
    selectedInst: installationSelector(state),
});

const mapDispatchToProps = {
    selectInst: setInst,
    addInstData: setInstallationData,
    setInstallations: setInstallations, 
};

export default connect(mapStateToProps, mapDispatchToProps)(Installations);

