import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { User } from '@/services/session.service';
import UserPage from '../pages/user';
import CompanySection from '@/components/CompanySection/CompanySection.component';
import AccountsSection from '@/components/AccountsSection/AccountsSection.component';


// === SETUP =====================================
let container: Element | null = null;

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
type MockedCompanySection = jest.MockedFunction<typeof CompanySection>;
type MockedAccountsSection = jest.MockedFunction<typeof AccountsSection>;

jest.mock('@/components/CompanySection/CompanySection.component');
jest.mock('@/components/AccountsSection/AccountsSection.component');


// === TESTS ====================================
const MOCK_USER: User = {
  id: 'mock-user',
  firstname: 'Jane',
  lastname: 'Smith',
};

describe('UserPage', () => {
  beforeEach(() => {
    (CompanySection as MockedCompanySection).mockImplementation(() => null);
    (AccountsSection as MockedAccountsSection).mockImplementation(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the user\'s name', async () => {
    await act(async () => {
      render(<UserPage user={MOCK_USER} />, container);
    });
    const userTitleEl = container?.querySelector('.user-title .user-name');
    expect(userTitleEl).toHaveTextContent('Smith Jane');
  });

  it('passes user.siren to CompanySection', async () => {
    const WITH_SIREN = {...MOCK_USER, siren: 'mock-siren'};
    await act(async () => {
      render(<UserPage user={WITH_SIREN} />, container);
    });
    expect(CompanySection).toHaveBeenCalledTimes(1);
    expect(CompanySection).toHaveBeenLastCalledWith({
      siren: WITH_SIREN.siren,
    }, {});

    const WITHOUT_SIREN = MOCK_USER;
    await act(async () => {
      render(<UserPage user={WITHOUT_SIREN} />, container);
    });
    expect(CompanySection).toHaveBeenCalledTimes(2);
    expect(CompanySection).toHaveBeenLastCalledWith({
      siren: null
    }, {});
  });

  it('passes user.id to AccountsSection', async () => {
    await act(async () => {
      render(<UserPage user={MOCK_USER} />, container);
    });
    expect(AccountsSection).toHaveBeenCalledTimes(1);
    expect(AccountsSection).toHaveBeenLastCalledWith({
      userId: MOCK_USER.id
    }, {});
  });
});
