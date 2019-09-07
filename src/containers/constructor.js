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
import ConstructorField from "./constructorField";

import { newDashboardSelector, setElemToNewDashboard, editElemInNewDashboard, deleteElemInNewDashboard, clearNewDashboard, setNewDashboard } from "../reducers/newDashboard";
import { dashboardsSelector, setDashboard } from "../reducers/dashboards";
import { dashboardNameSelector, setDashboardName } from "../reducers/dashboardName";
import { dashboardIdSelector, setDashboardId } from "../reducers/dashboardId";
import Close from "@material-ui/icons/Close";
import MoveIcon from "@material-ui/icons/OpenWith";
import EditIcon from "@material-ui/icons/Edit";
import { instDataObjectSelector } from "../reducers/installationsObjectData";
import queryString from "query-string";




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

//  function DashboardInConstructor({ newDashboard, editElement, deleteElement, 
//                         setMouseCoordinate, setNewElement, coord }) {
//     // console.log(newDashboard);
//     return (
//         <div className="dashboard">
//             {newDashboard.map((elem, id) => {
//                 console.log(elem);
//                 console.log(elem === "", coord.dragX , !coord.dragY)
//                 if (elem === "" ) {
//                     return null
//                 }
//                 if (coord.dragX || coord.dragY) {
//                     return (
//                         <div 
//                         key={id} 
//                         style={{position: 'absolute', left: coord.X - coord.dragX, top: coord.Y - coord.dragY}}
                        
//                         onMouseUP={(ev) => {
//                             console.log("mouseUp");
//                             setMouseCoordinate({dragX: 0 , dragY: 0});
//                             // console.log(coord);
//                         }}
//                         >
//                             {`${elem.element.name} : ${elem.element.value}`}
//                         </div>
//                     )
//                 }
//                 return (
//                         <ConstructorElement
//                         element={elem} />
//                     // <div 
//                     // key={id} 
//                     // style={{position: 'absolute', left: elem.X - 48, top: elem.Y}}
//                     // onMouseEnter={(ev) => {
//                     //     // console.log(ev.currentTarget.style.left);
//                     //     setMouseCoordinate({ in: false});
//                     // }}
//                     // onMouseLeave={(ev) => {
//                     //     // console.log(ev.currentTarget);
//                     //     setMouseCoordinate({ in: true});
//                     // }}
//                     // onMouseDown={(ev) => {
//                     //     setMouseCoordinate({dragX: coord.X - elem.X , dragY: coord.Y - elem.Y});
//                     //     console.log(coord);
//                     // }}
//                     // >
//                     //     {/* <IconButton
//                     //     className='move-elem-button'
//                     //     onClick={() => {
//                     //         setNewElement(newDashboard[id].element);
//                     //         deleteElement(id);
//                     //     }}>
//                     //         <MoveIcon />
//                     //     </IconButton> */}
//                     //     {/* <input 
//                     //     className="constructor-elem-input"
//                     //     size={elem.element.name.length}
//                     //     key={id}
//                     //     value={elem.element.name}
//                     //     onChange={({target: {value}}) => editElement({ id, value })} >
//                     //     </input> */}
//                     //     {`${elem.element.name} : ${elem.element.value}`}
                        
//                     //     {/* <IconButton 
//                     //     className='delete-elem-button'
//                     //     onClick={() => deleteElement(id)}>
//                     //         <Close />
//                     //     </IconButton> */}
//                     // </div>
//                 )
//             })}
//         </div>
//     )
// };


function LevitateElement({ newElement, coord, setToNewDashboard, clearElement, setMouseCoordinate }) {
    if (!coord.in && !coord.dragX && !coord.dragY) {
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
            onClick={(ev) => {
                console.log("click");
                if ( newElement.idSite !== newElementInitialState.idSite 
                    && newElement.param !== newElementInitialState.param ) {
                    setToNewDashboard({element: newElement, X: coord.X, Y: coord.Y});
                    clearElement();
                }}}
            onMouseUp={(ev) => {
                console.log("mouseup");
                setMouseCoordinate({ dragX: 0, dragY: 0 });
            }} >
                {newElement.name || "choose monitor"} : {newElement.value || ""}
        </div>
    )
}


class Constructor extends React.Component {
    componentWillMount() {
        const urlParam = queryString.parse(this.props.location.search);
        // console.log(urlParam);
        if (urlParam.id) {
            this.props.setNewDashboard(this.props.dashboards[urlParam.id].dashboard);
            this.props.setDashboardName(this.props.dashboards[urlParam.id].name);
            this.props.setDashboardId(urlParam.id);
        } else {
            this.props.setDashboardId(this.props.dashboards.length)
            this.props.setDashboardName(`Dashboard #${this.props.dashboards.length}`)
            this.props.clearNewDashboard();
        }
        // if (this.props.dashboardId === null) {
        //     this.props.setDashboardId(this.props.dashboards.length)
        // }
    };
    componentWillUnmount() {
        this.props.setDashboardId(null);
        this.props.clearNewDashboard();

    };
   render(){
    const { setMouseCoordinate, isLogin, installationResponce, 
        setNewElement, newElement, newDashboard, setToNewDashboard, 
        editElement, deleteElement, clearElement, dashboards, setDashboard, 
        dashboardName, setDashboardName, dashboardId, setDashboardId, 
        instDataObject } = this.props;

    // const sitesData = CreateInstallationsDataObject(installationResponce);

    const SiteSelect = () => {
        console.log("--- site select update ---");
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
        } }>
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


    // if (!isLogin.islogin) {
    //     return (
    //         <div className="inner-warning">Please login first!</div>
    //     );
    // }

    return (
        <div>
            <div style={{width: "100%"}}>
                {(installationResponce.data && installationResponce.data.records)
                ? (<SiteSelect />)
                   // <ParamSelect />
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
                value={newElement.name}
                onChange={({target: { value }}) => {
                    console.log(value);
                    setNewElement({ 
                        name: value
                    })
                }} />
            </div>
            {/* <div 
            className="constructor-field"
            style={{position: 'relative', 
                        height: "-webkit-fill-available",
                        width: '100%', 
                        cursor: 'crosshair'}} 
            onMouseMove={(ev) => {
                setMouseCoordinate({ 
                    X: ev.clientX - ev.currentTarget.getBoundingClientRect().left,
                    Y: ev.clientY - ev.currentTarget.getBoundingClientRect().top});
                    console.log(coord);
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
                }
            }>
                
            </div> */}
            <div style={{position: 'relative'}}>
                <ConstructorField />
                <DashboardInConstructor 
                newDashboard={newDashboard}
                editElement={editElement}
                deleteElement={deleteElement}
                setMouseCoordinate={setMouseCoordinate}
                setNewElement={setNewElement}
                // coord={coord}
                 />
            </div>
            
            {/* <LevitateElement
                newElement={newElement}
                coord={coord}
                setToNewDashboard={setToNewDashboard}
                clearElement={clearElement}
                setMouseCoordinate={setMouseCoordinate} /> */}

               
            <div style={{position: 'fixed', left: "5px", bottom: "5px", zIndex: "100"}}>
                <TextField 
                color="primary"
                onChange={({ target: { value }}) => setDashboardName(value)}
                value={dashboardName}
                >
                </TextField>
                <Button
                onClick={() => setDashboard({ 
                                    dashboard: newDashboard, 
                                    name: dashboardName, 
                                    id: dashboardId})}
                >Save dashboard</Button>
            </div>
        </div>
    );
   };
};

Constructor.propTypes = {
    // coord: PropTypes.object,
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
    dashboardId: PropTypes.number,
    setDashboardId: PropTypes.func,
    clearNewDashboard: PropTypes.func,
    instDataObject: PropTypes.object,
    setNewDashboard: PropTypes.func,

};

const mapStateToProps = state => ({
    // coord: mouseCoordSelector(state),
    isLogin: isLoginSelector(state),
    installationResponce: installationsSelector(state),
    newElement: newElementSelector(state),
    newDashboard: newDashboardSelector(state),
    dashboards: dashboardsSelector(state),
    dashboardName: dashboardNameSelector(state),
    dashboardId: dashboardIdSelector(state),
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
    setDashboardId: setDashboardId,
    setDashboard: setDashboard,
    clearNewDashboard: clearNewDashboard,
    setNewDashboard: setNewDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Constructor);

