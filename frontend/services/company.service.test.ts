import { Company, fetchCompany } from '@/services/company.service';


// === SETUP ====================================

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  (global.fetch as any).mockClear();
  delete (global as any).fetch;
});


// === TESTS ====================================
const MOCK_DATA = {
  unite_legale: {
    siren: 'fake-siren',
    denomination: 'Omni Consumer Products',
    etablissement_siege: {
      siret: 'fake-siret',
      geo_adresse: 'Detroit, Michigan'
    },
  }
};
const EXPECTED_COMPANY: Company = {
  siren: 'fake-siren',
  siret: 'fake-siret',
  name: 'Omni Consumer Products',
  address: 'Detroit, Michigan'
};


describe('companySrv::fetchCompanyInfo()', () => {
  it('returns basic Company fields', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue(({
      json: () => Promise.resolve(MOCK_DATA)
    }));

    const formattedCompany = await fetchCompany('siren');
    expect(formattedCompany).toStrictEqual(EXPECTED_COMPANY);
  });

  it('returns creationDate if unite_legale.date_creation is present', async () => {
    const dataWithDate = {
      unite_legale: {
        ...MOCK_DATA.unite_legale,
        date_creation: '2020-02-05',
      }
    };
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue(({
      json: () => Promise.resolve(dataWithDate)
    }));

    const companyWithDate = {
      ...EXPECTED_COMPANY,
      creationDate: new Date(dataWithDate.unite_legale.date_creation),
    };
    const formattedCompany = await fetchCompany('siren');
    expect(formattedCompany).toStrictEqual(companyWithDate);
  });
});
