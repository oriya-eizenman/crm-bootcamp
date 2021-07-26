import React from 'react';
// import { Icon } from '@iconify/react';
// import locationIcon from '@iconify/icons-mdi/map-marker';
import { IoIosPin } from 'react-icons/io';

export default function LocationPin({ text }) {
    return (
        <div className="pin">
            {/* <Icon icon={IoIosPin} className="pin-icon" /> */}
            <IoIosPin className="icon" />
            <p className="pin-text">{text}</p>
        </div>
    );
}