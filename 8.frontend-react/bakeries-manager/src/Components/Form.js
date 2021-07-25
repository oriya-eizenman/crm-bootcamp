import React from 'react';
import Input from './Input';
import { Link } from "react-router-dom";
import Label from './Label';
import Button from './Button';
import FormFieldsGroup from './FormFieldsGroup';
import Select from 'react-select';

export default function Form(props) {
    return (
        <div className="formContainer">
            <form className={"form " + props?.className}>
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
                    // else if (field.type === 'select')
                    //     return (
                    //         <select
                    //             name={field.name}
                    //             value={field.value}
                    //             onChange={field.onChange}
                    //             className={"select " + field?.className}
                    //         >
                    //             {field.options.map(option =>
                    //                 <option value={option.value} className="select">{option.description}</option>
                    //             )}
                    //         </select>
                    //     )
                    else if (field.type === 'select')
                        return (
                            <Select
                                defaultValue={{
                                    label: field.defaultValue,
                                    value: field.defaultValue
                                }}
                                onChange={field.onChange}
                                options={field.options}
                            />
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
                                />
                            </div>
                        )
                    else if (field.type === 'group')
                        return (
                            <FormFieldsGroup fields={field.fields} className={field.className} />
                        )
                    else if (field.type === 'hr')
                        return (
                            <hr className="hr"></hr>
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
                    else if (field.type === 'file')
                        return (
                            <div>
                                <input type="file" onChange={field.onChange} />
                                <Button
                                    handleClick={field.onClick}
                                    value="Upload"
                                />
                                {field.fileData}
                            </div>
                        )
                })
                }
            </form>
        </div>
    );
}