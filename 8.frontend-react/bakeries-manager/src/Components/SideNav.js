import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNav({ links }) {
    return (
        <div className="sidenav">
            {links.map(link =>
                < Link to={link.to} className="sidenavLink" key={link.value} onClick={link.handleClick}>
                    {link.value}
                </Link>

            )}
        </div>
    );
}