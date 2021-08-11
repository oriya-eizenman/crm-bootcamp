import React from 'react';
import { Link } from 'react-router-dom';
import { getNavBarLinks } from '../Constants/SideNavLinks';
import logo from "../media/logo/logo_transparent copy.png";
import manageLogout from '../scripts/manageLogout';
import { RiShoppingBagLine, RiUserSettingsLine, RiHome3Line } from 'react-icons/ri';
import { FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { TiMessages } from 'react-icons/ti';
import { BsGraphUp } from 'react-icons/bs';

export default function SideNav(props) {
    function setUser() {
        manageLogout();
        props.setLoggedInUser(null);
    }

    return (
        <div className="sidenav">
            <img className="logo" src={logo} />
            {props.links.map(link => {
                let className = link.value === "New order" ? "sidenavLink newOrder" : `sidenavLink ${link.value}`;
                className += link.value === props.activatedPage ? " activatedPage" : "";

                let icon;
                switch (link.value) {
                    case 'Orders':
                        icon = <RiShoppingBagLine className="navbarIcon" />;
                        break;
                    case 'Users':
                        icon = <RiUserSettingsLine className="navbarIcon" />;
                        break;
                    case 'Clients':
                        icon = <FiUsers className="navbarIcon" />;
                        break;
                    case 'Items':
                        icon = <GiWheat className="navbarIcon" />;
                        break;
                    case 'Messages':
                        icon = <TiMessages className="navbarIcon" />;
                        break;
                    case 'Settings':
                        icon = <FiSettings className="navbarIcon" />;
                        break;
                    case 'Statistics':
                        icon = <BsGraphUp className="navbarIcon" />;
                        break;
                    default:
                        icon = <></>;
                }

                let settings =
                    <div className="settings">
                        <Link
                            to="/"
                            className={className}
                        >
                            <RiHome3Line className="navbarIcon" />
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/logout"
                            className={className}
                            onClick={() => setUser()}
                        >
                            <FiLogOut className="navbarIcon" />
                            <span>Logout</span>
                        </Link>
                    </div>

                return (
                    < Link
                        to={link.to}
                        className={className}
                        key={link.value}
                        onClick={link?.handleClick}
                    >
                        {icon}

                        {link.value === "New order" ?
                            <span className={className + "Span"}>{link.value}</span> :
                            link.value
                        }

                        {link.value === 'Settings' && settings}


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