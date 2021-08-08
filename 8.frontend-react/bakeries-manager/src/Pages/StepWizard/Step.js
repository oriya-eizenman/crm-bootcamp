import React from 'react';

export default function Step(props) {
    return (
        <div className="stepData">
            <h2>{props.stepTitle}</h2>
            <div className="stepContent">
                {props.component}
            </div>
            <div className="stepNavigation">
                {props.showPrevious && <button className="previousStep" onClick={props.previousStep}>Previous Step</button>}
                <button className="nextStep" onClick={props.nextStep} disabled={props.disableNextPage}>Next Step</button>
            </div>
        </div>
    );
}