import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import MansaLogo from './MansaLogo.component';


export default {
  title: 'Components/MansaLogo',
  component: MansaLogo
} as ComponentMeta<typeof MansaLogo>;

const Template: ComponentStory<typeof MansaLogo> = (args) =>
  <MansaLogo />;


export const Logo = Template.bind({});
Logo.args = {};
