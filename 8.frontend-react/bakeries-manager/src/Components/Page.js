import React from 'react';
import Header from './Header';
import SideNav from './SideNav';

export default function Page(props) {
    return (
        <div className="page">
            {props.headerLinks && <Header links={props.headerLinks} />}
            <div className={props.loggedIn ? "body" : "bodyVisitor"}>
                {props.showNavbar && <SideNav
                    activatedPage={props.activatedPage}
                    links={props.navbarLinks}
                    setLoggedInUser={props.setLoggedInUser}
                />}
                <div
                    className={props.loggedIn ? "mainContent" : "mainContentVisitor"}
                >
                    {props.mainContent}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}