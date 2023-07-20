import React from "react";
import "../styles/UploadReadingForm.css";

const StepComponent = ({ currentStep, totalSteps }) => {
  return (
    <div className="stepContainer">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isLastStep = stepNumber === totalSteps;

        return (
          <div
            key={index}
            className={`${"step"} ${isActive ? "active" : ""} ${
              isLastStep ? "lastStep" : ""
            }`}
          >
            {isLastStep ? <span>&#10003;</span> : stepNumber}
          </div>
        );
      })}
    </div>
  );
};
export default StepComponent;
