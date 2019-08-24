import React from "react";
import { Link } from "react-router-dom";



export function MainMenu() {
    return (
        <div className="main-menu">
            <ul>
                <li>
                <Link to="/sites">Go to main</Link>
                </li>
                <li>
                <Link to="/sites">Go to main</Link>
                </li>
                <li>
                <Link to="/sites">Go to main</Link>
                </li>
                <li>
                <Link to="/newdashboard">New Dashboard</Link>
                </li>
            </ul>
        </div>
    )
};