import manageLogout from '../scripts/manageLogout';

function setUser(setLoggedInUser) {
    manageLogout();
    setLoggedInUser(null);
}

const getNavBarLinks = (setLoggedInUser) =>
(
    [
        {
            to: "/new-order",
            value: "New order",
        },
        {
            to: "/orders",
            value: "Orders"
        },
        {
            to: "/users",
            value: "Users"
        },
        {
            to: "/clients",
            value: "Clients"
        },
        {
            to: "/items",
            value: "Items"
        },
        {
            to: "/messages",
            value: "Messages"
        },
        {
            to: "/delivery-map",
            value: "Map"
        },
        {
            to: "/",
            value: "Home"
        },
        {
            to: "/logout",
            value: "Logout",
            handleClick: () => setUser(setLoggedInUser)
        },
    ]
)

export { getNavBarLinks };