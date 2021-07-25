import React, { useContext } from 'react';
import Page from './Page';
import UserContext from '../UserContext';
import { getHeaderLinks } from '../Constants/LoggedInHeaderLinks';
import { getNavBarLinks } from '../Constants/SideNavLinks';

export default function LoggedInPage(props) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <Page
            mainContent={props.mainContent}
            // headerLinks={getHeaderLinks(setLoggedInUser)}
            navbarLinks={getNavBarLinks(setLoggedInUser)}
            setLoggedInUser={setLoggedInUser}
            showNavbar={true}
            activatedPage={props.activatedPage}
        />
    );
}