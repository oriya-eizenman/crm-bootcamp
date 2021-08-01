import React from 'react';
import LoggedInPage from '../Components/LoggedInPage';
import { getNavBarLinks } from '../Constants/SideNavLinks';

export default function Messages() {

    const handleClick = () => {
        const iframe = document.getElementById("iframe");
        iframe.contentWindow.postMessage(1233, '*');


    }

    const receiveMessage = (event) => {
        alert(event.data)
    }

    const mainContent =
        <iframe
            className="messages"
            id="iframe"
            src="http://localhost:7000/crm-client"
            onLoad={() => {
                // const iframe = document.querySelector('#getItems');
                // console.log(iframe);
                // document.querySelector('#iframe').contentWindow.window.postMessage('message', 'http://localhost:7000')
                // window.addEventListener('message', receiveMessage, false);

                // window.onmessage = async function (e) {
                //     alert(e.data)
                // };

            }}
        >
        </iframe>


    return (
        <LoggedInPage mainContent={mainContent} />
    );
}