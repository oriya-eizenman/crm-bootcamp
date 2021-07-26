import React from 'react';

export default function Href(props) {
    return (
        <a
            onClick={props.handleClick}
            className={`href ${props.className}`}>
            {props.value}
        </a>
    );
}