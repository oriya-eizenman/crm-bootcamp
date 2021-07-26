import React from 'react';
import Header from './Header';
import SideNav from './SideNav';

export default function Page(props) {
    return (
        <div className="page">
            {props.headerLinks && <Header links={props.headerLinks} />}
            <div className="body">
                {props.showNavbar && <SideNav
                    activatedPage={props.activatedPage}
                    links={props.navbarLinks}
                    setLoggedInUser={props.setLoggedInUser}
                />}
                <div className="mainContent">
                    {props.mainContent}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}