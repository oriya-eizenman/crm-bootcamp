import React from 'react';

export default function RadioButtons(props) {
    return (
        <div onChange={props.handleChange}>
            {props.radioOptions.map(option => option)}
        </div>


    );
}