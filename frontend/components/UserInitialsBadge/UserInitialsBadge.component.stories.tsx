import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import UserInitialsBadge from './UserInitialsBadge.component';


export default {
  title: 'Components/UserInitialsBadge',
  component: UserInitialsBadge
} as ComponentMeta<typeof UserInitialsBadge>;

const Template: ComponentStory<typeof UserInitialsBadge> = (args) =>
  <UserInitialsBadge user={args.user} background={args.background} />;


export const WithName = Template.bind({});
WithName.args = {
  user: {
    id: 'user-id',
    firstname: 'Billy',
    lastname: 'Jeans',
  },
  background: 'hotpink'
};

export const Empty = Template.bind({});
Empty.args = {
  user: {
    id: 'user-id',
    firstname: '',
    lastname: ''
  },
  background: 'rosybrown'
};
