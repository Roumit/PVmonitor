import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mouseCoordSelector, setCoord } from "../reducers/mouseCoordinates";
import { newElementSelector, clearElement, initialState as newElementInitialState } from "../reducers/newDashboardElement";
import { setElemToConstructor } from "../reducers/dashboards";



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
        className="levitate-element-div"
        style={{
            position: 'absolute', 
            left: `${coord.X - coord.dragX}px`, 
            top: `${coord.Y - coord.dragY}px`,
            height: `${coord.Y - coord.dragY + 1}px`,
            }}
            onMouseUp={(ev) => {
                if ( newElement.idSite !== newElementInitialState.idSite 
                    && newElement.param !== newElementInitialState.param ) {
                    setToNewDashboard({element: newElement, X: coord.X - coord.dragX, Y: coord.Y - coord.dragY});
                    clearElement();
                }
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
            style={{position: 'absolute', 
                        top: '0',
                        bottom: '0',
                        width: '100%', 
                        }} 
            onMouseMove={(ev) => {
                setMouseCoordinate({ 
                    in: true,
                    X: ev.clientX - ev.currentTarget.getBoundingClientRect().left,
                    Y: ev.clientY - ev.currentTarget.getBoundingClientRect().top});
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
            }}>
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
    setToNewDashboard: setElemToConstructor, //setElemToNewDashboard,
    clearElement: clearElement,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorField);

