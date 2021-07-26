import React from 'react';
import Label from './Label';

export default function Input(props) {
    return (
        <div className={"input " + props?.className}>
            <label className="label">
                {props.label && props.label}
            </label>
            <input
                type={props.type}
                required
                value={props.value}
                name={props.name ? props.name : ""}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                className="text"
            />
            {props.errMsg && <Label value={props.errMsg} className="errorMsg" />}
        </div>
    );
}