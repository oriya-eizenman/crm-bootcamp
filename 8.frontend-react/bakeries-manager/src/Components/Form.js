import React, { useEffect, useState } from 'react';
import Input from './Input';
import { Link } from "react-router-dom";
import Label from './Label';

export default function Form(props) {
    return (
        <div>
            <form className="form">
                {props.fields.map(field => {
                    if (field.type === 'input')
                        return (
                            <Input
                                type={field.inputType}
                                value={field.value}
                                name={field.name}
                                handleChange={field.onChange}
                                placeholder={field.placeholder}
                                label={field.label}
                                errMag={field.errMsg}
                                key={field.label}
                            />
                        )
                    else if (field.type === 'select')
                        return (
                            <select
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                className="select"
                            >
                                {field.options.map(option =>
                                    <option value={option.value} className="select">{option.description}</option>
                                )}
                            </select>
                        )
                    else if (field.type === 'link')
                        return (
                            <div className="formButtonContainer">
                                <Link
                                    to={field.to}
                                    onClick={field.onClick}
                                    className="formButton"
                                    key={field.value}
                                >
                                    {field.value}
                                </Link>
                            </div>
                        )
                    else if (field.type === "errorMsg")
                        return (
                            <Label
                                value={field.value}
                                className="errorMsg"
                            />
                        )
                })
                }
            </form>
        </div>
    );
}