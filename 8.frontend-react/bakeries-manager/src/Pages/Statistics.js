import React from 'react';
import LoggedInPage from '../Components/LoggedInPage';

export default function Statistics(props) {
    const mainContent =
        <iframe className="kibana" src="http://localhost:5601/app/kibana#/dashboard/my-dash?embed=true&_g=()&_a=(filters:!(('$$hashKey':'object:2136','$state':(store:appState),meta:(alias:!n,disabled:!f,index:stats,key:deviceType.keyword,negate:!f,value:desktop),query:(match:(deviceType.keyword:(query:desktop,type:phrase)))),('$$hashKey':'object:2269','$state':(store:appState),meta:(alias:!n,disabled:!f,index:stats,key:userAgent.keyword,negate:!f,value:'Google+Chrome'),query:(match:(userAgent.keyword:(query:'Google+Chrome',type:phrase))))),options:(darkTheme:!f),panels:!((col:1,id:all-events,panelIndex:1,row:1,size_x:7,size_y:4,type:visualization),(col:7,id:device-type,panelIndex:2,row:8,size_x:3,size_y:2,type:visualization),(col:8,id:metrics,panelIndex:3,row:1,size_x:5,size_y:4,type:visualization),(col:9,id:number-of-clicks-per-hour,panelIndex:4,row:5,size_x:4,size_y:3,type:visualization),(col:1,id:user-agent,panelIndex:5,row:8,size_x:3,size_y:2,type:visualization),(col:4,id:OS,panelIndex:6,row:8,size_x:3,size_y:2,type:visualization),(col:1,id:most-visited-pages,panelIndex:7,row:5,size_x:8,size_y:3,type:visualization),(col:10,id:new-order-button,panelIndex:8,row:8,size_x:3,size_y:2,type:visualization)),query:(query_string:(analyze_wildcard:!t,query:'*')),title:'my+dash',uiState:(P-1:(vis:(colors:(orders-link-click:%230A437C))),P-2:(vis:(colors:(desktop:%23447EBC))),P-4:(vis:(legendOpen:!f)),P-5:(vis:(colors:('Google+Chrome':%23AEA2E0))),P-7:(vis:(params:(sort:(columnIndex:!n,direction:!n))))))" height="600" width="800"></iframe>

    return (
        <LoggedInPage
            mainContent={mainContent}
            activatedPage="Statistics"
        />
    )
}