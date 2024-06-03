import { selectResolver, useEnhancedEditor, useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';
import { Element } from '@ws-ui/craftjs-core';
import { IStepperProps } from './Stepper.config';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const Stepper: FC<IStepperProps> = ({
  labelPosition,
  steps = [],
  stepStyle,
  activeColor,
  inactiveColor,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const { resolver } = useEnhancedEditor(selectResolver);

  const [currentStep, setCurrentStep] = useState(0);

  const activeCol = (index: number) => (currentStep === index ? activeColor : inactiveColor);
  const isFinalStep = (index: number) => index === steps.length - 1;

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getLabelPositionClasses = () => {
    switch (labelPosition) {
      case 'left':
        return { labelPos: 'flex-row-reverse', linePos: 'items-center' };
      case 'right':
        return { labelPos: 'flex-row', linePos: 'items-center' };
      case 'top':
        return { labelPos: 'flex-col-reverse', linePos: 'items-end' };
      case 'bottom':
        return { labelPos: 'flex-col', linePos: 'items-start' };
      default:
        return { labelPos: '', linePos: '' };
    }
  };

  const { labelPos, linePos } = getLabelPositionClasses();

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {steps.length > 0 ? (
        <>
          <div className="navigation my-3 flex w-full">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`steptitle-Container flex items-center ${isFinalStep(index) ? 'justify-end w-fit' : 'justify-between w-full'}`}
              >
                <div className={`h-full px-3 flex ${labelPos} items-center justify-center`}>
                  <div
                    className="nav-circle mx-1 rounded-full cursor-pointer font-semibold"
                    onClick={() => setCurrentStep(index)}
                    style={{
                      backgroundColor: activeCol(index),
                      color: currentStep === index ? 'white' : 'black',
                    }}
                  >
                    <span className="nav-title flex w-10 h-10 px-4 py-2 items-center justify-center">
                      {stepStyle === 'text' ? (
                        index + 1
                      ) : (
                        <Element id={`icon-${index}`} is={resolver.Icon} canvas />
                      )}
                    </span>
                  </div>
                  {step.title && (
                    <span
                      className="label max-w-8 mx-1 font-semibold text-center"
                      style={{ color: activeCol(index) }}
                    >
                      {step.title}
                    </span>
                  )}
                </div>

                {!isFinalStep(index) && (
                  <div className={`flex w-full h-6 ${linePos}`}>
                    <div
                      className="separator-line w-full h-0.5"
                      style={{ backgroundColor: activeCol(index + 1) }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {steps.map((_, index) => (
            <div
              key={index}
              className="content flex items-center justify-center w-full"
              style={{ display: currentStep === index ? 'block' : 'none' }}
            >
              <Element id={`step-${index}`} is={resolver.StyleBox} canvas />
              <div className="buttons flex justify-around">
                {currentStep > 0 && (
                  <button
                    className="w-24 h-8 rounded-md bg-blue-500 text-white font-semibold"
                    onClick={goToPreviousStep}
                  >
                    Back
                  </button>
                )}
                {currentStep < steps.length - 1 && (
                  <button
                    className="w-24 h-8 rounded-md bg-blue-500 text-white font-semibold"
                    onClick={goToNextStep}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-steps flex h-24 w-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
          <BsFillInfoCircleFill className="mb-1 h-8 w-8" />
          <p>Please create some steps</p>
        </div>
      )}
    </div>
  );
};

export default Stepper;
