import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { REDUCER_NAME as currentWidgetSize, setWidgetSize} from "../reducers/currentWidgetSize"
import { editElemInNewDashboard } from "../reducers/newDashboard";



export default function WidgetFrame(props) {

    const dispatch = useDispatch();
    const size = useSelector(state => state[currentWidgetSize]);

    const saveToNewDashboard = () => {
        dispatch(editElemInNewDashboard({
            id: size.id,
            element: {
                size: {
                    X: size.X,
                    Y: size.Y,
                    H: size.H,
                    W: size.W,
                }
            }
        }));
    };

    return (
        <div 
        className='widget-size-outer-div'
        style={{
            position: 'absolute', 
            left: size.X,
            top: size.Y,
            width: `${size.W}px`,
            height:`${size.H}px`,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgb(0,0,0)',
        }}>
            {props.children}
            <div 
            className='top-move-div'
            style={{
                position: 'absolute',
                right: 0,
                top: size.move? '-50px': '0px',
                height: size.move? '100px': '24px',
                width: '100%',
                cursor: 'move',
            }}
            onMouseMove={(ev) => {
                ev.preventDefault();
                // console.log('=== mouse move ===');
                if (size.move) {
                    // console.log(ev.clientX,'  =====  ',size.dX, '  ====  ', size.X)
                    // console.log(document.getElementsByClassName('constructor-box')[0].offsetTop);
                    const X = ev.clientX - size.dX - size.left;
                    const Y = ev.clientY - size.dY - size.top;
                    dispatch(setWidgetSize({ X, Y }));
                }
            }}
            onMouseDown={(ev) => {
                // console.log('=== mouse down ===');
                dispatch(setWidgetSize({ 
                    move: true,
                    dX: ev.clientX - ev.currentTarget.parentElement.getBoundingClientRect().left,
                    dY: ev.clientY - ev.currentTarget.parentElement.getBoundingClientRect().top,
                 }));
            }}
            onMouseUp ={(ev) => {
                // console.log('=== mouse up ===');
                dispatch(setWidgetSize({ 
                    move: false,
                    dY: 0,
                    dX:0
                 }));
                 saveToNewDashboard();
            }}
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ 
                    move: false,
                    dY: 0,
                    dX:0
                }));
                saveToNewDashboard();
            }}>
                <div
                className='top-widget-div'
                style={{
                    position: 'absolute',
                    top: size.move? '50%': 0,
                    width: '100%',
                    height: '24px',
                }}></div>
            </div>
            <div 
            className='right-scale-div'
            style={{
                position: 'absolute',
                right: size.resizeX? '-50px': '-5px',
                top: 0,
                height: '100%',
                width: size.resizeX? '100px': '10px',
                cursor: 'ew-resize',
            }}
            onMouseMove={(ev) => {
                ev.preventDefault();
                // console.log('=== mouse move ===');
                if (size.resizeX) {
                    const currentSizeX = ev.clientX - ev.currentTarget.parentElement.getBoundingClientRect().left;
                    dispatch(setWidgetSize({ W: currentSizeX }));
                }
            }}
            onMouseDown={(ev) => {
                // console.log('=== mouse down ===');
                dispatch(setWidgetSize({ resizeX: true }));
            }}
            onMouseUp ={(ev) => {
                // console.log('=== mouse up ===');
                dispatch(setWidgetSize({ resizeX: false }));
                saveToNewDashboard();
            }}
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ resizeX: false }));
                saveToNewDashboard();
            }}
            ></div>
            <div 
            className='bottom-scale-div'
            style={{
                position: 'absolute',
                bottom: size.resizeY? '-50px': '-5px',
                height: size.resizeY? '100px': '10px',
                width: '100%',
                cursor: 'ns-resize'
            }}
            onMouseMove={(ev) => {
                ev.preventDefault();
                // console.log('=== mouse move ===');
                if (size.resizeY) {
                    const currentSizeY = ev.clientY - ev.currentTarget.parentElement.getBoundingClientRect().top;
                    dispatch(setWidgetSize({ H: currentSizeY }));
                }
            }}
            onMouseDown={(ev) => {
                // console.log('=== mouse down ===');
                dispatch(setWidgetSize({ resizeY: true }));
            }}
            onMouseUp ={(ev) => {
                // console.log('=== mouse up ===');
                dispatch(setWidgetSize({ resizeY: false }));
                saveToNewDashboard();
            }}
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ resizeY: false }));
                saveToNewDashboard();
            }}
            ></div>
            <div 
            className='bottom-right-corner-scale-div'
            style={{
                position: 'absolute',
                right: (size.resizeY && size.resizeX)? '-50px': '-5px',
                bottom: (size.resizeY && size.resizeX)? '-50px': '-5px',
                height: (size.resizeY && size.resizeX)? '100px': '10px',
                width: (size.resizeY && size.resizeX)? '100px': '10px',
                cursor: 'nwse-resize'
            }}
            onMouseMove={(ev) => {
                ev.preventDefault();
                // console.log('=== mouse move ===');
                if (size.resizeY && size.resizeX) {
                    const currentSizeX = ev.clientX - ev.currentTarget.parentElement.getBoundingClientRect().left;
                    const currentSizeY = ev.clientY - ev.currentTarget.parentElement.getBoundingClientRect().top;
                    dispatch(setWidgetSize({ W: currentSizeX, H: currentSizeY }));
                }
            }}
            onMouseDown={(ev) => {
                // console.log('=== mouse down ===');
                dispatch(setWidgetSize({ resizeX: true, resizeY: true }));
            }}
            onMouseUp ={(ev) => {
                // console.log('=== mouse up ===');
                dispatch(setWidgetSize({ resizeX: false, resizeY: false }));
                saveToNewDashboard();
            }}
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ resizeX: false, resizeY: false }));
                saveToNewDashboard();
            }}>
                <div
                style={{
                    position: 'absolute',
                    bottom: '50%',
                    right: '50%',
                    height: '5px',
                    width: '5px',
                    background: 'linear-gradient(to bottom right, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 45%'
                }}></div>
            </div>
        </div>
    )
};
