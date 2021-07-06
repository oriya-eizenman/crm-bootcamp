import React from 'react';
import { Link } from "react-router-dom";
import Href from './Href';

export default function Header({ links }) {
    return (
        <div className="header">
            <div className="container">
                <div>
                    <h1 className="title">PIE CHART</h1>
                    <h2 className="subtitle">Your tool to manage your bakery</h2>
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