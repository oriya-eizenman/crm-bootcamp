import React from 'react';
import { Link } from "react-router-dom";
import Button from './Button';

export default (props) => {
    return (
        <div>
            <header>
                <h1>Welcome to PIE CHART!</h1>
                <h3>Your tool to manage your bakery!</h3>
                <Link to="/login">
                    <Button
                        onClick={props.handleOnClick}
                        value="LOGIN"
                    />
                </Link>
            </header>
        </div>
    );
}