import React from 'react';
import bakery from '../media/bakery.jpg';
import Page from '../Components/Page';
import { landingPageHeaderLinks } from '../Constants/VisitorHeaderLinks';

export default function LandingPage(props) {
    const mainContent =
        <img src={bakery} className="bakeryImg" alt="bakery" />

    return (
        <Page mainContent={mainContent} headerLinks={landingPageHeaderLinks} />

    );
}