import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";



export function MainMenu({ dashboards, hide, toggleHide, setDashboardId,
    setDashboardName, clearNewDashboard, clearWidgetSize }) {
    if (hide) {
        return (
            <div className='main-menu-conteiner'>
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
        <div
        className='main-menu-conteiner'
        onMouseLeave={toggleHide}>
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
                {dashboards.map( (dashboard, id) => {
                    if (dashboard) {    
                        return (
                            <Link 
                            key={id}
                            to={`/dashboards/?id=${dashboard.id}`} 
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
                onClick={() => {
                    toggleHide();
                    setDashboardId(dashboards.length);
                    setDashboardName(`Dashboard #${dashboards.length}`);
                    clearNewDashboard();
                    clearWidgetSize();
                }}>
                    <div className="main-menu-base-elem">
                        Create Dashboard
                    </div>
                </Link>
            </div>
        </div>
    )
};
