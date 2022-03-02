import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AccountCard from './AccountCard';
import { Account } from '@/services/accounts';


// === SETUP =====================================
let container: Element | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (!container) { return; }
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


// === TESTS ====================================
const MOCK_ACCOUNT: Account = {
  id: 'account-1',
  type: 'transaction',
  number: '123',
  balance: 42,
  currency: 'EUR',
};

describe('AccountCard', () => {
  it('display account data', async () => {
    await act(async () => {
      render(<AccountCard account={MOCK_ACCOUNT} />, container);
    });
    expect(container?.querySelector('.account-number')).toHaveTextContent('Account Number: 123');
    expect(container?.querySelector('.account-balance')).toHaveTextContent('Balance: 42 EUR');
  });
});
