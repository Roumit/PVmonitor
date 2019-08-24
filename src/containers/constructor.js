import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import { mouseCoordSelector, setCoord } from "../reducers/mouseCoordinates";
import { isLoginSelector } from "../reducers/loginVRM";

let newDashboardData = [];

function DashboardObject() {
    return (
        <div>
            {newDashboardData.map((elem) => {
                return (
                    <div style={{position: 'absolute', left: elem.X, top: elem.Y}} >
                        <input disabled />
                    </div>
                )
            })}
        </div>
    )
};

class Constructor extends React.Component {
    
   render(){
    const { setMouseCoordinate, coord, isLogin } = this.props;
    
    if (!isLogin.islogin) {
        return (
            <div className="inner-warning">Please login first!</div>
        );
    }

    return (
    <div style={{position: 'relative', height: '300px', width: '100%', cursor: 'crosshair'}} 
    onMouseMove={(ev) => {
        // console.log(ev.clientX, " : ", ev.clientY);
        console.log(ev.currentTarget.getBoundingClientRect().top);
        setMouseCoordinate({ X: ev.clientX, Y: ev.clientY - ev.currentTarget.getBoundingClientRect().top});
        }
    }
    onClick={(ev) => {
            newDashboardData.push({type: "input", X: coord.X, Y: coord.Y});
            console.log(newDashboardData);
        }
    }>
        <div style={{position: 'absolute', left: `${coord.X}px`, top: `${coord.Y}px`}}>coordinate test X:{coord.X} Y:{coord.Y}</div>
        <DashboardObject />
    </div>
    );
   };
};

Constructor.propTypes = {
    coord: PropTypes.object,
    setMouseCoordinate:PropTypes.func,
    isLogin: PropTypes.object,
};

const mapStateToProps = state => ({
    coord: mouseCoordSelector(state),
    isLogin: isLoginSelector(state),
});

const mapDispatchToProps = {
    setMouseCoordinate: setCoord,
};

export default connect(mapStateToProps, mapDispatchToProps)(Constructor);

