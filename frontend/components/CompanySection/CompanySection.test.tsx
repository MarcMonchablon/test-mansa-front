import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Company, fetchCompany } from '@/services/company';
import CompanySection from './CompanySection';


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
type MockedFetchCompany = jest.MockedFunction<typeof fetchCompany>;

jest.mock('@/services/company', () => ({
  ...jest.requireActual('@/services/company'),
  fetchCompany: jest.fn(),
}));


// === TESTS ====================================
const MOCK_COMPANY: Company = {
  name: 'Pied Piper',
  siren: 'mock-siren',
  siret: 'mock-siret',
  address: 'mock address'
};

describe('CompanySection', () => {
  beforeEach(() => {
    (fetchCompany as MockedFetchCompany)
      .mockImplementation(async (siren: string) => MOCK_COMPANY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetch and display infos', async () => {
    await act(async () => {
      render(<CompanySection siren={MOCK_COMPANY.siren} />, container);
    });
    const fields: Array<keyof Company> = ['name', 'siret', 'address'];
    for (const field of fields) {
      const fieldTextEl = container?.querySelector(`.field--${field} .field-value`) as Element;
      expect(fieldTextEl.textContent).toBe(MOCK_COMPANY[field]);
    }
  });

  it('should call entreprise.data.gouv.fr API only once per SIREN', async () => {
    const siren1 = 'siren-1';
    const siren2 = 'siren-2';

    // First render
    await act(async () => {
      render(<CompanySection siren={siren1} />, container);
    });
    expect(fetchCompany).toBeCalledTimes(1);

    // Second render, with same React hook
    await act(async () => {
      render(<CompanySection siren={siren1} />, container);
    });
    expect(fetchCompany).toBeCalledTimes(1);
    expect(fetchCompany).toHaveBeenLastCalledWith(siren1);

    // Third render, different value this time
    await act(async () => {
      render(<CompanySection siren={siren2} />, container);
    });
    expect(fetchCompany).toBeCalledTimes(2);
    expect(fetchCompany).toHaveBeenLastCalledWith(siren2);
  });
});
