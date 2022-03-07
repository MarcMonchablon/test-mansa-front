import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AccountCard from './AccountCard.component';
import { Account } from '@/services/accounts.service';


export default {
  title: 'Components/AccountCard',
  component: AccountCard,
} as ComponentMeta<typeof AccountCard>;

const Template: ComponentStory<typeof AccountCard> = (args) =>
  <AccountCard {...args} />;


const MOCK_ACCOUNT: Account = {
  id: 'mock-id',
  type: 'transaction',
  number: '26178346',
  balance: 175.52,
  currency: 'GBP',
};

export const Transaction = Template.bind({});
Transaction.args = {
  account: MOCK_ACCOUNT
};

export const Loading = Template.bind({});
Loading.args = {};
