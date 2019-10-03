import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";




export function MainMenu({ dashboards, hide, toggleHide,
    setDashboardName, clearConstructorDashboard, clearWidgetSize }) {
    if (hide) {
        return (
            <div className='main-menu-conteiner'>
                <Button 
                variant={'outlined'}
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
            variant={'outlined'}
            color="primary"
            className="main-menu-button"
            onClick={toggleHide}>
                Menu
            </Button>
            <div className="main-menu">
                <Link 
                to="/sites" 
                onClick={toggleHide}>
                    <div className="main-menu-base-elem">
                        Go to main
                    </div>
                </Link>
                { Object.keys(dashboards).map((elem) => {
                    if (dashboards[elem].dashboard) {    
                        return (
                            <Link 
                            key={elem}
                            to={`/dashboards/?id=${elem}`} 
                            onClick={toggleHide}>
                                <div className="main-menu-elem">
                                    {dashboards[elem].name}
                                </div>
                            </Link>     
                        );
                    }
                    return null;
                })}
                {/* {dashboards.map( (dashboard, id) => {
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
                })} */}
                <Link 
                to="/newdashboard" 
                onClick={() => {
                    toggleHide();
                    setDashboardName(`Dashboard #${dashboards.length}`);
                    clearConstructorDashboard();
                    clearWidgetSize();
                }}>
                    <div className="main-menu-base-elem">
                        Create new dashboard
                    </div>
                </Link>
            </div>
        </div>
    )
};
