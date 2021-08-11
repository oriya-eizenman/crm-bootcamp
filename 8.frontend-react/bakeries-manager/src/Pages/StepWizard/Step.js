import React from 'react';

export default function Step(props) {
    const nextStep = ">>"
    const previousStep = "<<"

    return (
        <div className="stepData">
            <h2>{props.stepTitle}</h2>
            <div className="stepContent">
                {props.component}
            </div>
            <div className="stepNavigation">
                {props.showPrevious && <button className="previousStep" onClick={props.previousStep}>{previousStep}</button>}
                <button className="nextStep" onClick={props.nextStep} disabled={props.disableNextPage}>{nextStep}</button>
            </div>
        </div>
    );
}