import React from 'react';
import { Link } from 'react-router-dom';
import { getNavBarLinks } from '../Constants/SideNavLinks';
import logo from "../media/logo/logo_transparent copy.png";
import manageLogout from '../scripts/manageLogout';

export default function SideNav(props) {
    function setUser(setLoggedInUser) {
        manageLogout();
        setLoggedInUser(null);
    }

    return (
        <div className="sidenav">
            <img className="logo" src={logo} />
            {props.links.map(link => {
                let className = link.value === "New order" ? "sidenavLink newOrder" : "sidenavLink";
                className += link.value === props.activatedPage ? " activatedPage" : "";
                return (
                    < Link
                        to={link.to}
                        className={className}
                        key={link.value}
                        onClick={link?.handleClick}
                    >
                        {link.value === "New order" ?
                            <span className={className + "Span"}>{link.value}</span> :
                            link.value
                        }

                    </Link>
                );
            }
            )}
            {/* <button class="dropdown-btn">Dropdown
    <i className="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-container">
                <Link className="dropDown-sidenav" to="/home">Home</Link>
                <Link className="dropDown-sidenav" to="/" handleClick={() => setUser(props.setLoggedInUser)}>Log out</Link>
            </div> */}
        </div>
    );
}