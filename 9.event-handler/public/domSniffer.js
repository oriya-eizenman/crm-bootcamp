let stats = [];
let loadTime;
let exitTime;
let oldUrl;
const handleClick = (event) => {
    if (window.location.href !== oldUrl) {
        addTimeSpentEvent(event, oldUrl);
        oldUrl = window.location.href;
    }
    if (event.target.className.includes("sidenavLink")) {
        console.log('here')
        addSidenavClick(event);
    }
    if (event.target.className.includes("button")) {
        addActionClick(event);
    }
}

const getBrowser = () => {
    let sBrowser;
    const sUsrAg = navigator.userAgent;

    if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
        sBrowser = "Samsung Internet";
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
        sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Trident") > -1) {
        sBrowser = "Microsoft Internet Explorer";
    } else if (sUsrAg.indexOf("Edge") > -1) {
        sBrowser = "Microsoft Edge";
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
    } else {
        sBrowser = "unknown";
    }

    return sBrowser;
}

const getOS = () => {
    let os;
    const sUsrAg = navigator.userAgent.toLowerCase();
    const platform = navigator.platform;

    if (platform.indexOf("iPhone") > -1 || (platform.indexOf("iPod") > -1) || (platform.indexOf("iPad") > -1)) {
        os = "iOS";
    }
    else if (sUsrAg.indexOf("mac os") > -1) {
        os = "MacOS";
    } else if (sUsrAg.indexOf("linux") > -1) {
        os = "Linux";
    } else if (sUsrAg.indexOf("android") > -1) {
        os = "Android";
    } else if (sUsrAg.indexOf("windows") > -1) {
        os = "Windows";
    } else {
        os = "unknown";
    }

    return os;
}

const addTimeSpentEvent = async (event, oldUrl) => {
    const timeSpent = msToTime(Date.now() - loadTime);

    const pagePath = oldUrl;
    const key = getEventName(pagePath, "surfing-time");

    const generalEventData = await getGeneralEventData(event);
    const eventData = {
        type: "surfingTime",
        name: key,
        timeSpent: timeSpent,
        ...generalEventData
    }

    stats.push(eventData);
}

const addSidenavClick = async (event) => {
    const pagePath = event.target.href || event.target.innerText.toLowerCase().replace(' ', '_');
    const key = getEventName(pagePath, "link-click");

    const generalEventData = await getGeneralEventData(event);
    const eventData = {
        type: "click",
        name: key,
        ...generalEventData
    }

    stats.push(eventData);
}

const addActionClick = async (event) => {
    const className = event.target.className;
    const action = className.substring(className.indexOf(' ') + 1);
    const key = getEventName(action, "action-click");

    const generalEventData = await getGeneralEventData(event);
    const eventData = {
        type: "click",
        name: key,
        ...generalEventData
    }

    stats.push(eventData);
}

const getGeneralEventData = async (event) => {
    const userData = await getLoggedInUser();

    const generalEventData = {
        account_id: userData.bakery_id,
        user_id: userData.user_id,
        os: getOS(),
        userAgent: getBrowser(),
        deviceType: getDeviceType(),
        screenWidth: document.body.clientWidth,
        screenHeight: document.body.clientHeight,
        url: window.location.href,
        class: event.target.className,
        time: formatted_date(),
        date: formatted_date()
    };

    return generalEventData;
}

const getEventName = (pagePath, eventDescription) => {
    const lastIndexOf = pagePath.lastIndexOf('/');
    const pageName = (lastIndexOf < pagePath.length - 1) ? pagePath.substring(lastIndexOf + 1) : "home";
    return `${pageName}-${eventDescription}`;
}

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

function formatted_date() {
    var result = "";
    var d = new Date();
    result += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() +
        " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return result;
}

function msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
}

window.addEventListener('click', handleClick, []);

// window.addEventListener('load', () => navigator.geolocation.getCurrentPosition((pos) => console.log(pos), (err) => console.log(err)))

var saveEventsToDB = setInterval(() => {
    axios.post('http://localhost:9000/saveEvents', { events: stats })
        .then(response => {
            stats = [];
        })
        .catch(error => console.error('error', error));
}, 5000);

// window.onload(
//     saveEventsToDB
// )

window.addEventListener('beforeunload', function (event) {
    event.preventDefault();
    saveEventsToDB;
});

window.addEventListener('load', function (event) {
    loadTime = Date.now();
    oldUrl = window.location.href;
})

window.addEventListener('load', function (event) {
    addActionLoad(event);
})

const addActionLoad = async (event) => {
    const generalEventData = await getGeneralEventData(event);
    let geoLocation;
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            geoLocation =
            {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            }
            const eventData = {
                type: "load",
                location: geoLocation,
                ...generalEventData
            }

            stats.push(eventData);
        },
        (err) => {
            geoLocation =
            {
                lat: "unknown",
                long: "unknown"
            }
            const eventData = {
                type: "load",
                location: geoLocation,
                ...generalEventData
            }

            stats.push(eventData);
        }
    );
}

const getLoggedInUser = async () => {
    const res = await axios.post('http://localhost:8005/registred', {},
        { withCredentials: true })
    return res.data;
}