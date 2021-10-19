import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/Auth-context";

import './MainNavigation.css';

const mainNavigation = props => (
   <AuthContext.Consumer>
       {(context) => {
           return(
            <header className="main-navigation">
            <div className="main-navigation-logo">
                <h1>Easy Event</h1>
            </div>
            <nav className="main-navigation__item">
                <ul>
                    {!context.token && (
                        <li>
                            <NavLink to="/auth">Authentication</NavLink>
                        </li>
                    )}

                    {/* {!context.token && (
                        <li>
                            <NavLink to="/Ragis">Ragistration</NavLink>
                        </li>
                    )} */}

                    

                    <li>
                        <NavLink to="/events">Registration</NavLink>
                    </li>
                    {context.token && (
                        <React.Fragment>
                            <li>
                                <NavLink to="/bookings">Bookings</NavLink>
                            </li>
                            <li>
                                <button onClick={context.logout}>logout</button>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>
           )
       }} 
    
    </AuthContext.Consumer>
);

export default mainNavigation;