import React from 'react';
import Title from '../Components/Title';
import manage from '../scripts/manageLogout';
import Page from '../Components/Page';

export default function Home({ handleLogoutMethod }) {
    function handleLogout() {
        manage();
        handleLogoutMethod();
    }

    const links =
        [
            {
                to: "/users",
                value: "Users",
            },
            {
                to: "/",
                value: "Log out",
                handleClick: handleLogout
            }
        ]

    const mainContent =
        <div className="container">
            <Title title="Hello!" />
            <article>
                <h3>Here you will have all you need to manage your bakery!</h3>
            </article>
        </div>

    return (
        <Page mainContent={mainContent} headerLinks={links} />
    );
}