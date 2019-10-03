import React from "react";
import ConstructorElement from "./constructorElement";
import WidgetFrame from "./widgetFrame";




export default function DashboardInConstructor({ newDashboard, editElement, deleteElement, 
    setMouseCoordinate, setNewElement, instDataObject, setTargetWidget, clearWidgetSize, dashboards }) {
return (
<div 
className="dashboard-in-constructor">
    <div 
    className="constructor-help-text" 
    style={{
        disabled: true, 
        }}>
        <p>Choose site and parameter to add parameter element.</p>
        <p>Press "Add widget" button to add widget element.</p>
        <p>To move parameter element hold mouse button and drag.</p>
        <p>To move widget element hold mouse button on top side and drag.</p>
        <p>To scale widget element use botoom and right side or bottom-right corner.</p>
        <p>Saved dashboards are in menu list.</p>
    </div>
        
    {dashboards.constructor.dashboard.map((elem, id) => {
        if (elem.delete) {
            return null
        }
        if (elem.element.type === 'widget'){
            return (
                <WidgetFrame
                key={id}
                id={id}
                setTargetWidget={setTargetWidget}
                size={elem.element.size}
                deleteElement={deleteElement}
                clearWidgetSize={clearWidgetSize}>
                    <div>Some content....</div>
                </WidgetFrame>
            )
        }
        return (
            <ConstructorElement
            element={elem}
            setMouseCoordinate={setMouseCoordinate}
            setNewElement={setNewElement}
            deleteElement={deleteElement}
            dashboards={dashboards}
            editElement={editElement}
            instDataObject={instDataObject}
            id={id}
            key={id} />
            
        
        )
    })}
</div>
)};
