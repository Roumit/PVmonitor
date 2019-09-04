import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {} from "react-router";
import { dashboardsSelector, deleteDashboard } from "../reducers/dashboards";
import { installationsSelector, setInstallations } from "../reducers/installationsVRM";
import { updateTimerId, updateInstallations } from "./apiVRM";
import { isLoginSelector } from "../reducers/loginVRM";
import { Button } from "@material-ui/core";
import { setInstallationObjectData, instDataObjectSelector } from "../reducers/installationsObjectData";



class Dashboard extends React.Component {
    componentWillUnmount(){
        clearInterval(updateTimerId);
        clearTimeout(updateTimerId);
    }
    componentWillMount(){
        updateInstallations(this.props.isLogin, this.props.setInstallations, 
            this.props.setInstallationObjectData);
    };
    render() {
        const { dashboards,  
            deleteDashboard, instDataObject } = this.props;
        const targetId = this.props.location.pathname.slice(12);
        return(
            <div style={{position: "static"}}>
                <div className="dashboard" style={{position: "relative"}}>
                {dashboards[targetId].dashboard.map((elem, id) => {
                    if (elem === "") {
                        return null
                    }
                    return (
                    <div
                    key={id} 
                    style={{position: 'absolute', left: elem.X, top: elem.Y}} >
                    {`${elem.element.name} : 
                    ${(instDataObject[elem.element.idSite] && instDataObject[elem.element.idSite][elem.element.param])
                        ? instDataObject[elem.element.idSite][elem.element.param].value
                        : "---"
                    }`}
                    </div>
                )})}  
                </div>
                <div style={{position: 'fixed', left: "5px", bottom: "5px"}}>
                <Button onClick={
                    () => {
                        this.props.history.push(`/newdashboard/?id=${targetId}`);
                    }
                }>Change dashboard</Button>
                <Button onClick={() => {
                    if (window.confirm("Do you really want to delete dashboard?")) {
                        deleteDashboard(targetId);
                        this.props.history.push("/");
                    }
                }}>Delete dashboard</Button>
                </div>
            </div>
            
        );
    };
};

Dashboard.propTypes = {
    dashboards: PropTypes.array,
    installationsResponce: PropTypes.object,
    isLogin: PropTypes.object,
    setInstallations: PropTypes.func,
    deleteDashboard: PropTypes.func,
    setInstallationObjectData: PropTypes.func,
    instDataObject: PropTypes.object,

};

const mapStateToProps = state => ({
    dashboards: dashboardsSelector(state),
    installationsResponce: installationsSelector(state),
    isLogin: isLoginSelector(state),
    instDataObject: instDataObjectSelector(state),
});

const mapDispathToProps = {
    setInstallations: setInstallations,
    deleteDashboard: deleteDashboard,
    setInstallationObjectData: setInstallationObjectData,
};

export default connect(mapStateToProps, mapDispathToProps)(Dashboard);