import React from 'react';

export default function Button(props) {
    return (
        <button
            onClick={props.handleClick}
            type="button"
            disabled={props.disabled}
            className={props.className ? `button ${props.className}` : 'button'}
        >
            {props.value}
        </button>
    );
}