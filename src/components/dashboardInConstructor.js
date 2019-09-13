import React from "react";
import ConstructorElement from "./constructorElement";
import WidgetFrame from "../containers/widgetFrame";




export default function DashboardInConstructor({ newDashboard, editElement, deleteElement, 
    setMouseCoordinate, setNewElement, instDataObject }) {
return (
<div 
className="dashboard-in-constructor">
    <div 
    className="constructor-help-text" 
    style={{
        disabled: true, 
        }}>
        <p>Choose site and parameter to add element.</p>
        <p>To move element hold mouse button and drag.</p>
        <p>Saved dashboards are in menu list.</p>
    </div>
    <WidgetFrame 
    Component={null}>
        <div>123456789</div>
    </WidgetFrame>
        
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