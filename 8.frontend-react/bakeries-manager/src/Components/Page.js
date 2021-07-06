import React from 'react';
import Header from './Header';
import SideNav from './SideNav';

export default function Page(props) {
    return (
        <div className="page">
            <Header links={props.headerLinks} />
            {props.showNavbar && <SideNav />}
            <div className="mainContent">
                {props.mainContent}
            </div>
            {/* <Footer /> */}
        </div>
    );
}