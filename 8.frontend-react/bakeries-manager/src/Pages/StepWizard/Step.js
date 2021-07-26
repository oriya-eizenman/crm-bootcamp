import React from 'react';

export default function Step(props) {
    return (
        <div>
            <h2>{props.stepTitle}</h2>
            <div>
                {props.component}
            </div>
            {props.showPrevious && <button onClick={props.previousStep}>Previous Step</button>}
            <button onClick={props.nextStep} disabled={props.disableNextPage}>Next Step</button>
        </div>
    );
}