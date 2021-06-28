import React from 'react';

export default (props) => {
    return (
        <div>
            <label>
                {props.label}
                <input
                    type={props.type}
                    required
                    value={props.value}
                    name={props.name ? props.name : ""}
                    onChange={props.handleChange}
                />
            </label>
        </div>
    );
}