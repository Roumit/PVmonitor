import React from "react";
import ConstructorElement from "./constructorElement";




export default function DashboardInConstructor({ newDashboard, editElement, deleteElement, 
    setMouseCoordinate, setNewElement, coord }) {
// console.log(newDashboard);
return (
<div className="dashboard">
{newDashboard.map((elem, id) => {
    console.log(elem);
    if (elem === "" ) {
        return null
    }
    // if (coord.dragX || coord.dragY) {
    // return (
    //     <div 
    //     key={id} 
    //     style={{position: 'absolute', left: coord.X - coord.dragX, top: coord.Y - coord.dragY}}
        
    //     onMouseUP={(ev) => {
    //         console.log("mouseUp");
    //         setMouseCoordinate({dragX: 0 , dragY: 0});
    //         // console.log(coord);
    //     }}
    //     >
    //         {`${elem.element.name} : ${elem.element.value}`}
    //     </div>
    // )
    // }
    return (
        <ConstructorElement
        element={elem}
        setMouseCoordinate={setMouseCoordinate}
        setNewElement={setNewElement}
        deleteElement={deleteElement}
        newDashboard={newDashboard}
        id={id} />
    // <div 
    // key={id} 
    // style={{position: 'absolute', left: elem.X - 48, top: elem.Y}}
    // onMouseEnter={(ev) => {
    //     // console.log(ev.currentTarget.style.left);
    //     setMouseCoordinate({ in: false});
    // }}
    // onMouseLeave={(ev) => {
    //     // console.log(ev.currentTarget);
    //     setMouseCoordinate({ in: true});
    // }}
    // onMouseDown={(ev) => {
    //     setMouseCoordinate({dragX: coord.X - elem.X , dragY: coord.Y - elem.Y});
    //     console.log(coord);
    // }}
    // >
    //     {/* <IconButton
    //     className='move-elem-button'
    //     onClick={() => {
    //         setNewElement(newDashboard[id].element);
    //         deleteElement(id);
    //     }}>
    //         <MoveIcon />
    //     </IconButton> */}
    //     {/* <input 
    //     className="constructor-elem-input"
    //     size={elem.element.name.length}
    //     key={id}
    //     value={elem.element.name}
    //     onChange={({target: {value}}) => editElement({ id, value })} >
    //     </input> */}
    //     {`${elem.element.name} : ${elem.element.value}`}
        
    //     {/* <IconButton 
    //     className='delete-elem-button'
    //     onClick={() => deleteElement(id)}>
    //         <Close />
    //     </IconButton> */}
    // </div>
    )
})}
</div>
)
};