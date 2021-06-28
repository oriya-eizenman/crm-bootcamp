import React from 'react';
import Input from './Input';
import Button from './Button';

export default (props) => {
    return (
        <div>
            <h2>Please enter your email address:</h2>
            <Input type="email" />
            <Button value="send email" />
        </div>
    );
}