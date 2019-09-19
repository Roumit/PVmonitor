import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";



export default function WidgetFrame({ size, setTargetWidget, id, deleteElement, clearWidgetSize, children }) {
    return (
        <div 
        className='widget-outer-div'
        style={{
            position: 'absolute', 
            left: size.X,
            top: size.Y,
            width: `${size.W}px`,
            height:`${size.H}px`,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgb(0,0,0)',
        }}
        onMouseEnter={(ev) => {
            // console.log('=== mouse enter ===');
            setTargetWidget({ id: id });
            setTargetWidget(size);
        }}
        >
            <div 
            className='widget-content-div'
            style={{
                position: 'absolute',
                left: 0,
                top: '24px',
                
                backgroundColor: '#ffff',
                cursor: 'crosshair',
            }}>
                {children}
            </div>

            <div 
            className='top-widget-div'
            style={{
                position: 'absolute',
                right: 0,
                top: '0px',
                height: '24px',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                cursor: 'move',
            }}>
            </div>
            <div 
            className='bottom-right-corner-widget-div'
            style={{
                position: 'absolute',
                right: '-5px',
                bottom: '-5px',
                height: '10px',
                width: '10px',
                cursor: 'nwse-resize'
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
            <div 
            className='widget-top-left-buttons-div'
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                zIndex: 1000
            }}>
                <div>
                    <IconButton>
                         <EditIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton
                    className='delete-elem-button'
                    onClick={() => {
                        const confirm = window.confirm('Do You want delete element?');
                        if (confirm) {
                            deleteElement(id);
                            clearWidgetSize();
                        }
                    }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
};
