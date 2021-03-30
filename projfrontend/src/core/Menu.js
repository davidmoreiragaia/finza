import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth/helper/index"

//The useHistory hook gives you access to the history instance that you may use to navigate.
const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#2ecc72"};
    } else {
        return {color: "#FFFFFF"};
    }
};

//here we create the navigation links with conditional rendering according to if the use authenticated or not
const Menu = ({history, path}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>

                {/* { true && true } if this is authenticated give a true result. this means that applyin this to authenticate it will display the info if is true */}
                {/* this below will display a conditionally rendered dashboard if the user is authenticated */}
                { isAuthenticated() && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/borrowuser/dashboard")} className="nav-link" to="/borrowuser/dashboard">
                            Dashboard
                        </Link>
                    </li>
                ) }
                {/* this means if it is not authenticated return ... */}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                                 Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                                Signin
                            </Link>
                        </li>
                    </Fragment>
                )}
                
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            onClick={() => {
                                signout(() => {
                                    history.push("/")
                                });
                            }}
                            className="nav-link text-warning">
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

//export default Menu;
//we will export menu usin router dom to have history and path
export default withRouter(Menu);