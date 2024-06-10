import { selectResolver, useEnhancedEditor, useRenderer } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';
import { Element } from '@ws-ui/craftjs-core';
import { BsFillInfoCircleFill } from 'react-icons/bs';

import { IStepperProps } from './Stepper.config';

import { colorToHex } from '../Shared/colorUtils';
import { TinyColor } from '@ctrl/tinycolor';

const Stepper: FC<IStepperProps> = ({
  linear,
  labelPosition,
  steps = [],
  stepStyle,
  activeColor,
  inactiveColor,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
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

  let labelPos: string;
  let linePos: string;

  switch (labelPosition) {
    case 'left':
      labelPos = 'flex-row-reverse';
      linePos = 'items-center';
      break;
    case 'right':
      labelPos = 'flex-row';
      linePos = 'items-center';
      break;
    case 'top':
      labelPos = 'flex-col-reverse';
      linePos = 'items-end';
      break;
    case 'bottom':
      labelPos = 'flex-col';
      linePos = 'items-start';
      break;
    default:
  }

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
                    onClick={linear ? () => setCurrentStep(0) : () => setCurrentStep(index)}
                    style={{
                      border: colorToHex(activeCol(index)) === '#ffffff' ? '2px solid #000000' : '',
                      backgroundColor: activeCol(index),
                      color:
                        currentStep === index && new TinyColor(activeColor).isDark()
                          ? 'white'
                          : 'black',
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
                      style={{
                        color:
                          colorToHex(activeCol(index)) === '#ffffff' ? '#000000' : activeCol(index),
                      }}
                    >
                      {step.title}
                    </span>
                  )}
                </div>

                {!isFinalStep(index) && (
                  <div className={`flex w-full h-6 ${linePos}`}>
                    <div
                      className="separator-line w-full h-0.5"
                      style={{
                        backgroundColor:
                          colorToHex(activeCol(index + 1)) === '#ffffff'
                            ? '#000000'
                            : activeCol(index + 1),
                      }}
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
                    className="back-btn w-24 h-8 text-white font-semibold"
                    style={{
                      backgroundColor: activeCol(index),
                      border: colorToHex(activeCol(index)) === '#ffffff' ? '2px solid #000000' : '',
                      color: colorToHex(activeCol(index)) === '#ffffff' ? '#000000' : 'white',
                    }}
                    onClick={goToPreviousStep}
                  >
                    Back
                  </button>
                )}
                {currentStep < steps.length - 1 && (
                  <button
                    className="next-btn w-24 h-8 text-white font-semibold"
                    style={{
                      backgroundColor: activeCol(index),
                      border: colorToHex(activeCol(index)) === '#ffffff' ? '2px solid #000000' : '',
                      color: colorToHex(activeCol(index)) === '#ffffff' ? '#000000' : 'white',
                    }}
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
        <div className="no-steps flex h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-red-700 py-4 text-red-700">
          <BsFillInfoCircleFill className="mb-1 h-7 w-7 text-red-700" />
          <p className="font-semibold">No Steps</p>
        </div>
      )}
    </div>
  );
};

export default Stepper;
