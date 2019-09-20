import React, { createRef } from "react";
import PropTypes from "prop-types";
// import { Redirect } from "react-router";
import { connect } from "react-redux";
import { setCoord } from "../reducers/mouseCoordinates";
import { isLoginSelector } from "../reducers/loginVRM";
import { Button, TextField, Select, OutlinedInput } from "@material-ui/core";
import { installationsSelector } from "../reducers/installationsVRM";
import { setElement, newElementSelector, clearElement, initialState as newElementInitialState } from "../reducers/newDashboardElement";
import DashboardInConstructor from "../components/dashboardInConstructor";
import ConstructorField from "./constructorField";
import WidgetFrameSize from "./widgetSizeFrame";

import { newDashboardSelector, setElemToNewDashboard, editElemInNewDashboard, deleteElemInNewDashboard, clearNewDashboard, setNewDashboard } from "../reducers/newDashboard";
import { dashboardsSelector, setDashboard } from "../reducers/dashboards";
import { dashboardNameSelector, setDashboardName } from "../reducers/dashboardName";
import { instDataObjectSelector } from "../reducers/installationsObjectData";
import queryString from "query-string";
import { setWidgetSize, clearWidgetSize } from "../reducers/currentWidgetSize";



const elementTargetParamSet = (instDataObject, idSite) => {
    const dataArray = [];
    for (let key in instDataObject[idSite]) {
        dataArray.push({ 
            id: key, 
            name: instDataObject[idSite][key].name, 
            value: instDataObject[idSite][key].value })
    }
    return dataArray;  
};

function InitialWidget() {
    return {element: {
        type: 'widget',
        size: {
            X: 0,
            Y: 0,
            H: 100,
            W: 200,
        }
    },
    X: 0,
    Y: 0};
};

class Constructor extends React.Component {
    // componentWillUpdate(){
    //     console.log('===  constructor update ===');
    // }
    componentWillMount() {
        this.urlParam = queryString.parse(this.props.location.search);
        if (this.urlParam.id && this.props.dashboards[this.urlParam.id]) {
            this.urlParam.valid = true;
            this.props.setNewDashboard(this.props.dashboards[this.urlParam.id].dashboard);
            this.props.setDashboardName(this.props.dashboards[this.urlParam.id].name);
        } else {
            this.props.setDashboardName(`Dashboard #${this.props.dashboards.length}`)
            this.props.clearNewDashboard();
        }
      
    };
    componentDidMount(){
        // console.log("--- constructor did mount  ---");
        if (this.props.isLogin.islogin) {
            this.props.setWidgetSize({
                left: this.upperDiv.current.offsetLeft,
                top: this.upperDiv.current.offsetTop
            });
        }
    };

    componentDidUpdate(){
        // console.log("--- constructor did update  ---");
        if (this.props.isLogin.islogin) {
            this.props.setWidgetSize({
                left: this.upperDiv.current.offsetLeft,
                top: this.upperDiv.current.offsetTop
            });
        }
    };

    componentWillUnmount() {
        this.props.clearNewDashboard();
        this.props.clearWidgetSize();
    };

    upperDiv = createRef();


    render(){
    const { setMouseCoordinate, isLogin, installationResponce, 
        setNewElement, newElement, newDashboard, setToNewDashboard, 
        editElement, deleteElement, setDashboard, 
        dashboardName, setDashboardName, dashboards, 
        instDataObject, setTargetWidget, clearWidgetSize } = this.props;

    const SiteSelect = () => {
        return (
        <Select 
            native 
            inputProps={{ style: { width: "25" } }} 
            input={<OutlinedInput />} 
            color="primary" 
            name='site-select' 
            value={newElement.idSite} 
            onChange={({ target: { value } }) => {
            if (value !== "-") {
                setNewElement({
                    idSite: value
                });
            }
        }}>
            <option key="null" value="-" hidden>Choose site</option>
            {installationResponce.data.records.map((site) => (
                    <option key={site.idSite} value={site.idSite}>{site.name}</option>
                    ))}
        </Select>);
    };

    const ParamSelect = () => (
        <Select
        native
        inputProps={{style: {width: "25"}}}
        input={<OutlinedInput />}
        color="primary" 
        name='param-select' 
        value={newElement.param} 
        onChange={({target: { value }}) => {
            if (newElement.idSite !== newElementInitialState.idSite && value !== newElementInitialState.param) {
                setNewElement({
                    param: value, 
                    paramName: instDataObject[newElement.idSite][value].name,
                    value: instDataObject[newElement.idSite][value].value,
                    name: instDataObject[newElement.idSite][value].name
                })
            } 
        }}>
            <option key="null" value="-" hidden>
            {(newElement.idSite === newElementInitialState.idSite)? 
            "Choose site first" : "Choose parameter"}
            </option>
            
            {elementTargetParamSet(instDataObject, newElement.idSite).map((e) => (
                        <option key={e.id} value={e.id}>{e.name}</option>))}
        </Select>
    );


    if (!isLogin.islogin) {
        return (
            <div className="inner-warning">Please login first!</div>
        );
    }

    return (
        <div
        className="constructor" 
        >
            <div
            className="element-select-div"
            style={{
                width: '100%',
                }}>
                {(installationResponce.data && installationResponce.data.records)
                ? (<SiteSelect />)
                : (
                    <div>Loading...</div>
                )}
                 {(installationResponce.data && installationResponce.data.records)
                ? (<ParamSelect />)
                : null
                }
                
                <OutlinedInput 
                inputProps={{style: {width: "-webkit-fill-available"}}}
                color="primary"
                placeholder={"Edit parameter name"}
                value={newElement.name || ''}
                onChange={({target: { value }}) => {
                    setNewElement({ 
                        name: value
                    })
                }} />
                <Button
                variant={'outlined'}
                style={{
                    marginLeft: '10px'
                }}
                onClick={() => {
                    setToNewDashboard(new InitialWidget());
                }}
                >Add widget</Button>
            </div>
            
            <div
            ref={this.upperDiv}
            className="constructor-box"
            id="constructor-box"
            style={{
                position: 'relative',
                height: '100vh'
                }}>
                <ConstructorField />
                <DashboardInConstructor 
                newDashboard={newDashboard}
                editElement={editElement}
                deleteElement={deleteElement}
                setMouseCoordinate={setMouseCoordinate}
                setNewElement={setNewElement}
                instDataObject={instDataObject}
                setTargetWidget={setTargetWidget}
                clearWidgetSize={clearWidgetSize}
                 />
                <WidgetFrameSize>
                </WidgetFrameSize>
            </div>
                           
            <div style={{position: 'fixed', left: "5px", bottom: "5px", zIndex: "100"}}>
                <TextField 
                color="primary"
                onChange={({ target: { value }}) => setDashboardName(value)}
                value={dashboardName}
                >
                </TextField>
                <Button
                onClick={() => {
                    // console.log(newDashboard);
                    const filterNewDashboard = newDashboard.filter(
                        elem => (elem.delete === false || elem.delete === undefined));
                    setDashboard({ 
                        dashboard: filterNewDashboard, 
                        name: dashboardName, 
                        id: this.urlParam.valid ? this.urlParam.id : dashboards.length //dashboardId
                    });
                    alert(`Dashboard "${dashboardName}" saved. You can find it in main Menu.`)
                }}
                >Save dashboard</Button>
            </div>
            
        </div>
    );
   };
};

Constructor.propTypes = {
    setMouseCoordinate:PropTypes.func,
    isLogin: PropTypes.object,
    installationResponce: PropTypes.object,
    setNewElement: PropTypes.func,
    newElement: PropTypes.object,
    newDashboard: PropTypes.array,
    setToNewDashboard: PropTypes.func,
    editElement: PropTypes.func,
    deleteElement: PropTypes.func,
    clearElement: PropTypes.func,
    dashboards: PropTypes.array,
    setDashboard: PropTypes.func,
    dashboardName: PropTypes.string,
    setDashboardName: PropTypes.func,
    clearNewDashboard: PropTypes.func,
    instDataObject: PropTypes.object,
    setNewDashboard: PropTypes.func,
    setWidgetSize: PropTypes.func,
    setTargetWidget:PropTypes.func,
    clearWidgetSize: PropTypes.func,

};

const mapStateToProps = state => ({
    isLogin: isLoginSelector(state),
    installationResponce: installationsSelector(state),
    newElement: newElementSelector(state),
    newDashboard: newDashboardSelector(state),
    dashboards: dashboardsSelector(state),
    dashboardName: dashboardNameSelector(state),
    instDataObject: instDataObjectSelector(state),
});

const mapDispatchToProps = {
    setMouseCoordinate: setCoord,
    setNewElement: setElement,
    setToNewDashboard: setElemToNewDashboard,
    editElement: editElemInNewDashboard,
    deleteElement: deleteElemInNewDashboard,
    clearElement: clearElement,
    setDashboardName: setDashboardName,
    setDashboard: setDashboard,
    clearNewDashboard: clearNewDashboard,
    setNewDashboard: setNewDashboard,
    setWidgetSize: setWidgetSize,
    setTargetWidget: setWidgetSize,
    clearWidgetSize: clearWidgetSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(Constructor);

