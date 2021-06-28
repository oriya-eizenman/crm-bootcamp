import React from 'react';
import Button from './Button';
import manage from '../scripts/manageLogout';
import { Link } from "react-router-dom";

export default (props) => {
    function handleLogout(event) {
        manage();
        props.populateLoggedInUser();
    }

    return (
        <div>
            <header>
                <Link to="/">
                    <Button
                        handleClick={handleLogout}
                        value="LOG OUT!"
                    />
                </Link>
                <h1>Hello!</h1>
            </header>
            <article>
                <h3>Here you will have all you need to manage your bakery!</h3>
            </article>
        </div>
    );
}