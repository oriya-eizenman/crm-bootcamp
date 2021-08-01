let stats = [];
let loadTime;
let exitTime;
const handleClick = (event) => {
    // let tempStats = stats;
    stats["total-clicks"] = (stats["total-clicks"]) ? (stats["total-clicks"] + 1) : 1;
    if (event.target.className === "sidenavLink") {
        addSidenavClick(event);
    }
}

const addSidenavClick = (event) => {
    const pagePath = event.target.href;
    const lastIndexOf = pagePath.lastIndexOf('/');
    const pageName = (lastIndexOf < pagePath.length - 1) ? pagePath.substring(lastIndexOf + 1) : "home";
    const key = `${pageName}-link-click`;
    stats[key] = (stats[key]) ? (stats[key] + 1) : 1;
}

window.addEventListener('click', handleClick, []);

window.addEventListener('load', () => console.log(navigator))

const interval = setInterval(() => {
    console.log(stats);
}, 5000);

window.onload(
    interval
)