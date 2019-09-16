import React from "react";
import ConstructorElement from "./constructorElement";
import WidgetFrameSize from "../containers/widgetSizeFrame";
import WidgetFrame from "./widgetFrame";




export default function DashboardInConstructor({ newDashboard, editElement, deleteElement, 
    setMouseCoordinate, setNewElement, instDataObject, setTargetWidget }) {
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
        
    {newDashboard.map((elem, id) => {
        if (elem.delete) {
            return null
        }
        if (elem.element.type === 'widget'){
            return (
                <WidgetFrame
                id={id}
                setTargetWidget={setTargetWidget}
                size={elem.element.size}>
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