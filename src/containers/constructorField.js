import React from "react";
import PropTypes from "prop-types";
// import { Redirect } from "react-router";
import { connect } from "react-redux";
import { mouseCoordSelector, setCoord } from "../reducers/mouseCoordinates";
import { isLoginSelector } from "../reducers/loginVRM";
import { Input, Button, TextField, Select, OutlinedInput, IconButton } from "@material-ui/core";
import { installationsSelector } from "../reducers/installationsVRM";
import { setElement, newElementSelector, clearElement, initialState as newElementInitialState } from "../reducers/newDashboardElement";
import { CreateInstallationsDataObject } from "./apiVRM";
// import ConstructorElement from "./constructorElement";
import DashboardInConstructor from "../components/dashboardInConstructor";

import { newDashboardSelector, setElemToNewDashboard, editElemInNewDashboard, deleteElemInNewDashboard, clearNewDashboard, setNewDashboard } from "../reducers/newDashboard";
import { dashboardsSelector, setDashboard } from "../reducers/dashboards";
import { dashboardNameSelector, setDashboardName } from "../reducers/dashboardName";
import { dashboardIdSelector, setDashboardId } from "../reducers/dashboardId";
import Close from "@material-ui/icons/Close";
import MoveIcon from "@material-ui/icons/OpenWith";
import EditIcon from "@material-ui/icons/Edit";
import { instDataObjectSelector } from "../reducers/installationsObjectData";
import queryString from "query-string";



function LevitateElement({ newElement, coord, setToNewDashboard, clearElement, setMouseCoordinate }) {
    if (!coord.in && !coord.dragX && !coord.dragY) {
        return null;
    }
    if (coord.Y < 0) {
        return null;
    }
    if (newElement === newElementInitialState) {
        return null;
    }
    return (
        <div 
        style={{
            position: 'absolute', 
            left: `${coord.X - coord.dragX}px`, 
            top: `${coord.Y - coord.dragY}px`}}
            // onClick={(ev) => {
            //     console.log("click");
            //     if ( newElement.idSite !== newElementInitialState.idSite 
            //         && newElement.param !== newElementInitialState.param ) {
            //         setToNewDashboard({element: newElement, X: coord.X, Y: coord.Y});
            //         clearElement();
            //     }}}
            onMouseUp={(ev) => {
                if ( newElement.idSite !== newElementInitialState.idSite 
                    && newElement.param !== newElementInitialState.param ) {
                    setToNewDashboard({element: newElement, X: coord.X - coord.dragX, Y: coord.Y - coord.dragY});
                    clearElement();
                }
                // console.log("mouseup");
                setMouseCoordinate({ dragX: 0, dragY: 0 });
            }} >
                {newElement.name || "choose monitor"} : {newElement.value || ""}
        </div>
    )
}


class ConstructorField extends React.Component {
    componentDidUpdate(){
        // console.log("--- ConsructorField did update ---");
    }
    render(){
        const { setMouseCoordinate, coord, newElement, setToNewDashboard, clearElement } = this.props;
        return (
            <div 
            className="constructor-field"
            style={{position: 'relative', 
                        height: "-webkit-fill-available",
                        width: '100%', 
                        cursor: 'crosshair'}} 
            onMouseMove={(ev) => {
                setMouseCoordinate({ 
                    in: true,
                    X: ev.clientX - ev.currentTarget.getBoundingClientRect().left,
                    Y: ev.clientY - ev.currentTarget.getBoundingClientRect().top});
                    // console.log(coord);
                }
            }
            onMouseEnter={(ev) => {
                setMouseCoordinate({ in: true });
            }}
            onMouseLeave={(ev) => {
                setMouseCoordinate({ 
                    in: false, 
                    X: ev.clientX, 
                    Y: ev.clientY - ev.currentTarget.getBoundingClientRect().top});
            }}
            // onClick={(ev) => console.log("--- ConstructorField Click ---")}
            >

            <LevitateElement
            setMouseCoordinate={setMouseCoordinate}
            coord={coord}
            newElement={newElement}
            setToNewDashboard={setToNewDashboard}
            clearElement={clearElement} />    
            </div>
        );
    };
};

ConstructorField.propTypes = {
    coord: PropTypes.object,
    setMouseCoordinate:PropTypes.func,
    newElement: PropTypes.object,
    setToNewDashboard: PropTypes.func,
    clearElement: PropTypes.func,

};

const mapStateToProps = state => ({
    coord: mouseCoordSelector(state),
    newElement: newElementSelector(state),
});

const mapDispatchToProps = {
    setMouseCoordinate: setCoord,
    setToNewDashboard: setElemToNewDashboard,
    clearElement: clearElement,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorField);

