import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import { CiAlignLeft, CiAlignRight, CiAlignTop, CiAlignBottom } from 'react-icons/ci';

const commonSettings: TSetting[] = [
  {
    key: 'linear',
    label: 'Linear',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'labelPosition',
    label: 'Label Position',
    type: ESetting.RADIOGROUP,
    options: [
      { value: 'right', icon: CiAlignRight },
      { value: 'left', icon: CiAlignLeft },
      { value: 'top', icon: CiAlignTop },
      { value: 'bottom', icon: CiAlignBottom },
    ],
    defaultValue: 'right',
  },
  {
    key: 'activeColor',
    label: 'Active Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#3b82f6',
  },
  {
    key: 'inactiveColor',
    label: 'Inactive Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#c7cad4',
  },
  {
    key: 'stepStyle',
    label: 'Step Style',
    type: ESetting.SELECT,
    options: [
      {
        value: 'icon',
        label: 'Icon',
      },
      {
        value: 'text',
        label: 'Text',
      },
    ],
    defaultValue: 'text',
  },
  {
    key: 'steps',
    label: 'Steps',
    titleProperty: 'title',
    type: ESetting.DATAGRID,
    data: [
      {
        key: 'title',
        label: 'Title',
        type: ESetting.TEXT_FIELD,
      },
    ],
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter('dataAccess'),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
