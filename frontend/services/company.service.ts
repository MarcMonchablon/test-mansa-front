export interface Company {
  siren: string;
  siret: string;
  name: string;
  creationDate?: Date;
  address: string;
}


export async function fetchCompany(siren: string): Promise<Company | null> {
  const url = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/:siren'
    .replace(':siren', siren);

  return fetch(url)
    .then(response => response.json())
    .then((rawData) => formatCompany(rawData));
}


function formatCompany(raw: any): Company {
  const unit = raw.unite_legale as any;
  const siege = unit.etablissement_siege;
  const company: Company = {
    name: unit.denomination,
    siren: unit.siren,
    siret: siege.siret,
    address: siege.geo_adresse,
  };

  if (unit.date_creation) {
    company.creationDate = new Date(unit.date_creation);
  }

  return company;
}
