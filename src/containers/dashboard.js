import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {} from "react-router";
import { dashboardsSelector, deleteDashboard } from "../reducers/dashboards";
import { installationsSelector, setInstallations } from "../reducers/installationsVRM";
import { CreateInstallationsDataObject } from "./apiVRM";
import { updateInstallations } from "./installations";
import { isLoginSelector } from "../reducers/loginVRM";
import { Button } from "@material-ui/core";
import { setNewDashboard } from "../reducers/newDashboard";
import { setDashboardName } from "../reducers/dashboardName";
import { setDashboardId } from "../reducers/dashboardId";



class Dashboard extends React.Component {
    componentWillMount(){
        updateInstallations(this.props.isLogin, this.props.setInstallations);
    };
    render() {
        const { dashboards, installationsResponce, setNewDashboard, 
            deleteDashboard, setDashboardName, setDashboardId } = this.props;
        const targetId = this.props.location.pathname.slice(12);
        console.log(targetId);
        const dashboardsArray = dashboards[targetId].dashboard;
        const installationsData = CreateInstallationsDataObject(installationsResponce);
        return(
            <div style={{position: "static"}}>
                <div className="dashboard" style={{position: "relative"}}>
                {dashboards[targetId].dashboard.map((elem, id) => (
                    <div
                    key={id} 
                    style={{position: 'absolute', left: elem.X, top: elem.Y}} >
                    {`${elem.element.name} : 
                    ${installationsData[elem.element.idSite][elem.element.param].value}`}
                    </div>
                ))}  
                </div>
                <div style={{position: 'absolute', left: "5px", bottom: "5px"}}>
                <Button onClick={
                    () => {
                        setNewDashboard(dashboards[targetId].dashboard);
                        setDashboardName(dashboards[targetId].name);
                        setDashboardId(targetId);
                        this.props.history.push('/newdashboard');
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
    setNewDashboard: PropTypes.func,
    deleteDashboard: PropTypes.func,
    setDashboardName: PropTypes.func,
    setDashboardId: PropTypes.func,

};

const mapStateToProps = state => ({
    dashboards: dashboardsSelector(state),
    installationsResponce: installationsSelector(state),
    isLogin: isLoginSelector(state),
});

const mapDispathToProps = {
    setInstallations: setInstallations,
    setNewDashboard: setNewDashboard,
    deleteDashboard: deleteDashboard,
    setDashboardName: setDashboardName,
    setDashboardId: setDashboardId,
};

export default connect(mapStateToProps, mapDispathToProps)(Dashboard);