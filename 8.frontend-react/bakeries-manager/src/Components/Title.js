import React from 'react';

export default function Title(props) {
    return (
        <div className="titles">
            <div className="container">
                <h1 className="title">{props.title}</h1>
                {props.subtitle && <h2 className="subtitle">{props.subtitle}</h2>}
            </div>
        </div>
    );
}