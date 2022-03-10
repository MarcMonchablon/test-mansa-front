import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Company, fetchCompany } from '@/services/company.service';
import CompanySection from './CompanySection.component';


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

jest.mock('@/services/company.service', () => ({
  ...jest.requireActual('@/services/company.service'),
  fetchCompany: jest.fn(),
}));


// === TESTS ====================================
const MOCK_COMPANY: Company = {
  name: 'Pied Piper',
  siren: 'mock-siren',
  siret: 'mock-siret',
  creationDate: new Date('2019-07-08'),
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

    const nameFieldEl = container?.querySelector('.field[data-field-key="name"]');
    expect(nameFieldEl).toHaveTextContent('Name: ' + MOCK_COMPANY.name);

    const siretFieldEl = container?.querySelector('.field[data-field-key="siret"]');
    expect(siretFieldEl).toHaveTextContent('SIRET: ' + MOCK_COMPANY.siret);

    const dateFieldEl = container?.querySelector('.field[data-field-key="creationDate"]');
    expect(dateFieldEl).toHaveTextContent('Creation date: ' + '08/07/2019');

    const addressFieldEl = container?.querySelector('.field[data-field-key="address"]');
    expect(addressFieldEl).toHaveTextContent('Address: ' + MOCK_COMPANY.address);
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
