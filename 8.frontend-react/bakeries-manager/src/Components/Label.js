import React from 'react';

export default function Label(props) {
    return (
        <label
            className={props.className}
        >
            {props.value}
        </label>
    );
}