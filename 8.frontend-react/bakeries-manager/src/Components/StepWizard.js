import React, { useState } from 'react';
import Step from '../Pages/StepWizard/Step';

export default function StepWizard({ steps, currentStep, setCurrentStep }) {
    // const [currentStep, setCurrentStep] = useState(0);

    const step = steps[currentStep];

    // const previousStep = () => {
    //     if (currentStep > 0)
    //         setCurrentStep(currentStep - 1)
    // }

    // const nextStep = () => {
    //     if (currentStep < props.steps.length)
    //         setCurrentStep(currentStep + 1)
    // }

    // const mainContent =
    //     <div>
    //         {React.cloneElement(step.component, { ...props, currentStep, setCurrentStep })}
    //     </div>

    return (
        // { mainContent }
        <div>
            {step.component}
        </div>
    );
}