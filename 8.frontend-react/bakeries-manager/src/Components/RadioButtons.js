import React from 'react';

export default (props) => {
    return (
        <div onChange={props.handleChange}>
            {props.radioOptions.map(option => option)}
        </div>


    );
}