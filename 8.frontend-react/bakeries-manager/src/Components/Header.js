import React from 'react';
import { Link } from "react-router-dom";
import logo from "../media/logo/logo_transparent copy.png";

export default function Header({ links }) {
    return (
        <div className="header">
            <div className="container">
                <div>
                    <img className="logo" src={logo} />
                    {/* <h1 className="title">PIE CHART</h1> */}
                    {/* <h2 className="subtitle">Your tool to manage your bakery</h2> */}
                </div>
                <div className="headerLinks">
                    {links &&
                        links.map(link =>
                            < Link to={link.to} className="headerLink" key={link.value} onClick={link.handleClick}>
                                {link.value}
                            </Link>

                        )}

                </div>

            </div>
        </div >
    );
}