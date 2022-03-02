import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Account, fetchAccounts } from '@/services/accounts';
import AccountsSection from './AccountsSection';
import AccountCard from './AccountCard';


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


// === MOCKS ====================================
type MockedFetchAccounts = jest.MockedFunction<typeof fetchAccounts>;

jest.mock('@/services/accounts', () => ({
  ...jest.requireActual('@/services/accounts'),
  fetchAccounts: jest.fn(),
}));


// === TESTS ====================================
const MOCK_ACCOUNTS: Account[] = [{
  id: 'account-1',
  type: 'transaction',
  number: '123',
  balance: 42,
  currency: 'EUR',
}, {
  id: 'account-2',
  type: 'transaction',
  number: '456',
  balance: 151,
  currency: 'GBP',
}];

describe('AccountsSection', () => {
  beforeEach(() => {
    (fetchAccounts as MockedFetchAccounts)
      .mockImplementation(async (siren: string) => MOCK_ACCOUNTS);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render nothing when no account has been found', async() => {
    (fetchAccounts as MockedFetchAccounts)
      .mockImplementation(async (siren: string) => []);
    await act(async () => {
      render(<AccountsSection userId='user-id' />, container);
    });
    expect(container).toBeEmptyDOMElement();
  });

  it('should only call Mansa API once', async () => {
    const userId = 'user-id'

    // First render
    await act(async () => {
      render(<AccountsSection userId={userId} />, container);
    });
    expect(fetchAccounts).toBeCalledTimes(1);

    // Second render, with same React hook
    await act(async () => {
      render(<AccountsSection userId={userId} />, container);
    });
    expect(fetchAccounts).toBeCalledTimes(1);
    expect(fetchAccounts).toHaveBeenLastCalledWith(userId);
  });
});
