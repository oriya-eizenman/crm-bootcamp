import React from 'react';

export default (props) => {
    return (
        <div>
            <label>
                {props.label}
                <input
                    type="radio"
                    required value={props.value}
                    name={props.name ? props.name : ""}
                    onChange={props.handleChange}
                    key={props.value}
                    checked={props.value === props.selectedOption}
                    onChange={props.handleChange}
                />
            </label>
        </div>
    );
}