import React from 'react';
import Input from './Input';
import { Link } from "react-router-dom";
import Label from './Label';
import Button from './Button';

export default function FormFieldsGroup(props) {
    return (
        <div className={"fieldsGroup " + props?.className}>
            <Label value={props?.label} />
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
                            className={field?.className}
                        />
                    )
                else if (field.type === 'select')
                    return (
                        <select
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            className={"select " + field?.className}
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
                else if (field.type === 'button')
                    return (
                        <div>
                            <Button
                                handleClick={field.onClick}
                                value={field.value}
                                disabled={field.disabled}
                            />
                        </div>
                    )
                else if (field.type === 'group')
                    return (
                        <FormFieldsGroup fields={field.fields} className={field.className} />
                    )
                else if (field.type === 'label')
                    return (
                        <Label value={field.value} className="accordionLabel" />
                    )
                else if (field.type === 'subtitle')
                    return (
                        <h3>
                            {field.value}
                        </h3>
                    )
            })
            }
        </div>
    );
}