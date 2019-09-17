import React from "react";
import Close from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";
import { IconButton } from "@material-ui/core";


export default function ConstructorElement ({ element, setMouseCoordinate, setNewElement, deleteElement,
    newDashboard, editElement, instDataObject, id }) {

    if (!element) {
        return null;
    }

    return(
        <div className="constructor-element"
        style={{position: 'absolute', left: element.X, top: element.Y}}
        key={id}
        onMouseMove={(ev) => {
            setMouseCoordinate({
                X: ev.clientX,
                Y: ev.clientY - ev.currentTarget.parentElement.getBoundingClientRect().top
            });
        }}>
            <div
            style={{cursor: 'move'}}
            className='text-elem-dashboard-constructor-div'
            onMouseDown={(ev) => {
                if (ev.button === 0) {
                    setMouseCoordinate({
                        dragX: ev.clientX - ev.currentTarget.getBoundingClientRect().left,
                        dragY: ev.clientY - ev.currentTarget.getBoundingClientRect().top
                    });
                    setNewElement(newDashboard[id].element);
                    deleteElement(id);
                }
            }}>
                {`${element.element.name} : ${element.element.value}`}  
            </div>
            <div>
                <IconButton
                className='edit-elem-button'
                onClick={() => {
                    const newName = prompt("Monitor name:", element.element.name);
                    if (newName) {
                        editElement({ id: id, element: { name: newName}})
                    }
                }}>
                    <EditIcon />
                </IconButton >
            </div>
            <div>
                <IconButton 
                className='info-elem-button'
                onClick={() => {
                    // console.log(element);
                    alert(`
                    monitor name: ${element.element.name}
                    site: ${instDataObject[element.element.idSite].siteName}
                    parameter: ${instDataObject[element.element.idSite][element.element.param].name}
                    value example: ${instDataObject[element.element.idSite][element.element.param].value}`)}}>
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
                    }
                }}>
                    <Close />
                </IconButton>
            </div>   
        </div>
    );
};