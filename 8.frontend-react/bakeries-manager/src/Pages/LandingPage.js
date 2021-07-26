import React from 'react';
import bakery from '../media/bakery.jpg';
import Page from '../Components/Page';
import { landingPageHeaderLinks } from '../Constants/VisitorHeaderLinks';

export default function LandingPage(props) {
    // const links =
    //     [
    //         {
    //             to: "/login",
    //             className: "loginLink",
    //             value: "Login"
    //         }
    //     ];

    const mainContent =
        <div>
            <img src={bakery} className="bakeryImg" alt="bakery" />
        </div>

    return (
        <Page mainContent={mainContent} headerLinks={landingPageHeaderLinks} />

    );
}