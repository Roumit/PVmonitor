import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dashboardsSelector, deleteDashboard } from "../reducers/dashboards";
import { installationsSelector, setInstallations } from "../reducers/installationsVRM";
import { updateTimerId, updateInstallations } from "../models/apiVRM";
import { isLoginSelector } from "../reducers/loginVRM";
import { Button } from "@material-ui/core";
import { setInstallationObjectData, instDataObjectSelector } from "../reducers/installationsObjectData";
import queryString from "query-string";
import { Link } from "react-router-dom";


class Dashboard extends React.Component {
    componentWillUnmount(){
        // console.log(updateTimerId);
        clearInterval(updateTimerId);
        clearTimeout(updateTimerId);
    }
    componentWillMount(){
        this.props.updateInstallations(this.props.isLogin, 10000);
    };
    render() {
        const { dashboards, deleteDashboard, instDataObject } = this.props;
        const target = queryString.parse(this.props.location.search);
        if (!target.id || !dashboards[target.id]) {
            return (dashboards.map( (dashboard, id) => {
                if (dashboard) {    
                    return (
                        <Link 
                        key={id}
                        to={`/dashboards/?id=${dashboard.id}`} >
                            <div>
                                {dashboard.name}
                            </div>
                        </Link>     
                    );
                }
                return null;
            }));
        }
        return(
            <div style={{position: "static"}}>
                <div className="dashboard" style={{position: "relative"}}>
                {dashboards[target.id].dashboard.map((elem, id) => {
                    if (elem === "") {
                        return null
                    }
                    if (elem.element.type === 'widget'){
                        return (
                            <div
                            key={id}
                            id={id}
                            style={{
                                position: 'absolute',
                                left: elem.element.size.X,
                                top: elem.element.size.Y,
                                height: elem.element.size.H,
                                width: elem.element.size.W,
                                borderColor: 'rgba(0, 0, 0, 255)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                            }}
                            >
                                <div>Some content....</div>
                            </div>
                        )
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
                            this.props.history.push(`/newdashboard/?id=${target.id}`);
                        }
                    }>Change dashboard</Button>
                    <Button onClick={() => {
                        if (window.confirm("Do you really want to delete dashboard?")) {
                            deleteDashboard(target.id);
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
    updateInstallations: PropTypes.func,

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
    updateInstallations: updateInstallations,
};

export default connect(mapStateToProps, mapDispathToProps)(Dashboard);
