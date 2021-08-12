import React from 'react';
import bakery from '../media/bakery.jpg';
import graph1 from '../media/graph1.png';
import graph2 from '../media/grpah2.png';
import graph3 from '../media/graph3.png';

import Page from '../Components/Page';
import { landingPageHeaderLinks } from '../Constants/VisitorHeaderLinks';

export default function LandingPage(props) {
    const mainContent =
        <>
            <img src={bakery} className="bakeryImg" alt="bakery" />
            <img src={graph1} className="graph1" alt="graph1" />
            <img src={graph2} className="graph2" alt="graph2" />
            {/* <img src={graph3} className="graph3" alt="graph3" /> */}
        </>

    return (
        <Page mainContent={mainContent} headerLinks={landingPageHeaderLinks} />

    );
}