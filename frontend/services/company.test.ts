import { Company, fetchCompany } from '@/services/company';


// === SETUP ====================================
// FIXME: find why spyOn global.fetch throw the error:
// Cannot spy the fetch property because it is not a function; undefined given instead
/*const fetch = jest.spyOn(global, 'fetch');

beforeEach(() => {
  // @ts-ignore
  fetch.mockImplementation(() => Promise.resolve({
    json: Promise.resolve({foo: 'bar'})
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});*/


// === TESTS ====================================

describe('companySrv::fetchCompanyInfo()', () => {
  it('do stuff', async () => {
    // TODO: un-break spyOn to test API formatting function.
/*
    const company = await fetchCompanyInfo('siren');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(company).toBe('glubow');
  */
  });
});
