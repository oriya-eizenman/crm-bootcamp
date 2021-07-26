import React from 'react';

export default function Button(props) {
    return (
        <button
            onClick={props.handleClick}
            type="button"
            className="button"
        >
            {props.value}
        </button>
    );
}