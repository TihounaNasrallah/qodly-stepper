import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineLinearScale } from 'react-icons/md';

import StepperSettings, { BasicSettings } from './Stepper.settings';

export default {
  craft: {
    displayName: 'Stepper',
    kind: EComponentKind.BASIC,
    rules: {
      canMoveIn: () => true,
      canMoveOut: () => true,
    },
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(StepperSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Stepper',
    exposed: true,
    icon: MdOutlineLinearScale,
    events: [],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    activeColor: '#3b82f6',
    inactiveColor: '#c7cad4',
    stepStyle: 'text',
    labelPosition: 'right',
    linear: false,
  },
} as T4DComponentConfig<IStepperProps>;

export interface IStepperProps extends webforms.ComponentProps {
  linear: boolean;
  steps: { title: string }[];
  activeColor: string;
  inactiveColor: string;
  stepStyle: 'icon' | 'text';
  labelPosition: 'left' | 'right' | 'top' | 'bottom' | 'hidden';
}
