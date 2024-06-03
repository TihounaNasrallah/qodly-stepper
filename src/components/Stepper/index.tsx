import config, { IStepperProps } from './Stepper.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Stepper.build';
import Render from './Stepper.render';

const Stepper: T4DComponent<IStepperProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Stepper.craft = config.craft;
Stepper.info = config.info;
Stepper.defaultProps = config.defaultProps;

export default Stepper;
