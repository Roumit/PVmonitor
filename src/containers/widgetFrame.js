import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { REDUCER_NAME as currentWidgetSize, setWidgetSize} from "../reducers/currentWidgetSize"



export default function WidgetFrame(props) {
    // const Component = props.children;
    // console.log(props.children);

    const dispatch = useDispatch();
    const size = useSelector(state => state[currentWidgetSize]);

    return (
        <div 
        className='widget-outer-div'
        style={{
            position: 'absolute',
        }}
        >
            <div 
            className='widget-content-div'
            style={{
                width: `${size.W}px`,
                height:`${size.H}px`,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgb(0,0,0)',
                backgroundColor: '#ffff',
                cursor: 'crosshair'
            }}
            
            >
                {/* <Component /> */}
            </div>
            <div 
            className='right-scale-div'
            style={{
                position: 'absolute',
                right: -5,
                top: 0,
                height: '100%',
                width: '10px',
                cursor: 'ew-resize',
                draggable: false
            }}
            // onTouchMove={(ev) => console.log('=== ??? ===')}
            onMouseMove={(ev) => {
                ev.preventDefault();
                console.log('=== mouse move ===');
                const currentSizeX = ev.clientX - ev.currentTarget.parentElement.getBoundingClientRect().left;
                console.log(ev.currentTarget.parentElement.getBoundingClientRect().left);
                // console.log(ev.clientX);
                // console.log(currentSizeX);
                
                if (size.resizeX) {
                    // console.log(currentSizeX);
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
            }}gi
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ resizeX: false }));
            }}
            ></div>
            <div 
            className='bottom-scale-div'
            style={{
                position: 'absolute',
                bottom: -5,
                height: '10px',
                width: '100%',
                cursor: 'ns-resize'
            }}
            onMouseMove={(ev) => {
                ev.preventDefault();
                // console.log('=== mouse move ===');
                const currentSizeY = ev.clientY - ev.currentTarget.parentElement.getBoundingClientRect().top;
                console.log(ev.currentTarget.parentElement.getBoundingClientRect().top);
                // console.log(ev.clientY);
                // console.log(currentSizeY);
                
                if (size.resizeY) {
                    // console.log(currentSizeY);
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
            }}
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ resizeY: false }));
            }}
            ></div>
            <div 
            className='bottom-right-corner-scale-div'
            style={{
                position: 'absolute',
                right: -5,
                bottom: -5,
                height: '10px',
                width: '10px',
                cursor: 'nwse-resize',
                background: 'linear-gradient(to bottom right, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 45%'
            }}
            onMouseMove={(ev) => {
                ev.preventDefault();
                // console.log('=== mouse move ===');
                const currentSizeX = ev.clientX - ev.currentTarget.parentElement.getBoundingClientRect().left;
                console.log(ev.currentTarget.parentElement.getBoundingClientRect().left);
                const currentSizeY = ev.clientY - ev.currentTarget.parentElement.getBoundingClientRect().top;
                console.log(ev.currentTarget.parentElement.getBoundingClientRect().top);
                // console.log(ev.clientY);
                // console.log(currentSizeY);
                
                if (size.resizeY && size.resizeX) {
                    // console.log(currentSizeY);
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
            }}
            onMouseLeave={(ev) => {
                // console.log('=== mouse leave ===');
                dispatch(setWidgetSize({ resizeX: false, resizeY: false }));
            }}
            ></div>
        </div>
    )
};