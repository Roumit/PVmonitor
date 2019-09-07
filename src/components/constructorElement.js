import React from "react";


export default function ConstructorElement (props) {
    console.log("--- ComponentUpdate ---")
    const { element, setMouseCoordinate, setNewElement, deleteElement, newDashboard, id } = props;
    if (!element) {
        return null;
    }

    return(
        <div
        style={{position: 'absolute', left: element.X, top: element.Y}}
        onMouseDown={(ev) => {
            setMouseCoordinate({
                dragX: ev.clientX - ev.currentTarget.getBoundingClientRect().left,
                dragY: ev.clientY - ev.currentTarget.getBoundingClientRect().top
            });
            setNewElement(newDashboard[id].element);
            deleteElement(id);
        }}
        onDoubleClick={(ev) => {
            const newName = prompt("Monitor name:", element.element.name);
        }}
            >
            {`${element.element.name} : ${element.element.value}`}
        </div>
    );
};