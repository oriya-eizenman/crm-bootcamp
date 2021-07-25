import manageLogout from '../scripts/manageLogout';

function setUser(setLoggedInUser) {
    manageLogout();
    setLoggedInUser(null);
}

const getHeaderLinks = (setLoggedInUser) => {
    return (
    [
        {
            to: "/home",
            value: "Home",
        },
        {
            to: "/",
            value: "Log out",
            handleClick: () => setUser(setLoggedInUser)
        }
    ]
    );
}

export { getHeaderLinks };