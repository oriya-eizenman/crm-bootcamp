import React from 'react';
import LoggedInPage from '../Components/LoggedInPage';

export default function Messages() {

    const mainContent =
        <iframe
            className="messages"
            src="http://localhost:7000/crm-client"
        >
        </iframe>

    return (
        <LoggedInPage mainContent={mainContent} />
    );
}