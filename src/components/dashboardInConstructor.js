import React from "react";
import ConstructorElement from "./constructorElement";




export default function DashboardInConstructor({ newDashboard, editElement, deleteElement, 
    setMouseCoordinate, setNewElement, instDataObject }) {
return (
<div 
className="dashboard-in-constructor">
    <div className="constructor-help-text">
        <p>Choose site and parameter to add element.</p>
        <p>To move element hold mouse button and drag.</p>
        <p>Saved dashboards are in menu list.</p>
    </div>
    
{newDashboard.map((elem, id) => {
    if (elem.delete) {
        return null
    }
    
    return (
        <ConstructorElement
        element={elem}
        setMouseCoordinate={setMouseCoordinate}
        setNewElement={setNewElement}
        deleteElement={deleteElement}
        newDashboard={newDashboard}
        editElement={editElement}
        instDataObject={instDataObject}
        id={id}
        key={id} />
    
    )
})}
</div>
)
};