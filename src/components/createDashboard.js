import React from "react";

class Dashboard {
    constructor(name, elements=[]) {
        this.name = name;
        this.elements = elements;
    }

    addElement(element) {
        this.elements.append(element);
    }
};

const dash_1 = { 
    user: "id",
    elements: [
        {
            type: "value",
            target: "idUser/idSite/param",
            posX: '100px',
            posY: '35px',
            width: '120px',
            height: '30px'
        },
        {
            type: ""
        }
    ]
};

function DashboardConstructor(props){
    const { user, elements } = props;
    const addElement = (element) => {
        this.elements.append(element);
    }
    return (
        {
            user,
            element,

        }
    )
};