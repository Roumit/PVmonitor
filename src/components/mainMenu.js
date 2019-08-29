import React from "react";
import { Link } from "react-router-dom";



export function MainMenu({ dashboards }) {
    return (
        <div className="main-menu">
            <ul>
                <li>
                <Link to="/sites">Go to main</Link>
                </li>
                {dashboards.map( (dashboard) => {
                    if (dashboard) {    
                        return (
                            <li>
                                <Link to={`/dashboards/${dashboard.id}`}>{dashboard.name}</Link>
                            </li>
                        );
                    }
                    return null;  
                })}
                <li>
                <Link to="/newdashboard">New Dashboard</Link>
                </li>
            </ul>
        </div>
    )
};