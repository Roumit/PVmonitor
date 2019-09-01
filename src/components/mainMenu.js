import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";



export function MainMenu({ dashboards, hide, toggleHide }) {
    if (hide) {
        return (
            <div>
                <Button 
                color="primary"
                className="main-menu-button"
                onClick={toggleHide}>
                    Menu
                </Button>
            </div>
        )
    }
    return (
        <div onMouseLeave={toggleHide}>
            <Button 
            color="primary"
            className="main-menu-button"
            onClick={toggleHide}>
                hide menu
            </Button>
            <div className="main-menu">
                <Link 
                to="/sites" 
                onClick={toggleHide}>
                    <div className="main-menu-base-elem">
                        Go to main
                    </div>
                </Link>       
                {dashboards.map( (dashboard) => {
                    if (dashboard) {    
                        return (
                            <Link 
                            to={`/dashboards/${dashboard.id}`} 
                            onClick={toggleHide}>
                                <div className="main-menu-elem">
                                    {dashboard.name}
                                </div>
                            </Link> 
                        );
                    }
                    return null;
                })}
                <Link 
                to="/newdashboard" 
                onClick={toggleHide}>
                    <div className="main-menu-base-elem">
                        Create Dashboard
                    </div>
                </Link>
            </div>
        </div>
    )
};