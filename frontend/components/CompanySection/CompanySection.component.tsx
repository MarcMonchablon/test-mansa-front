import React from 'react';
import useCompany, { Status, Company } from '@/hooks/useCompany.hook';


interface CompanySectionProps {
  siren: string | null;
}

export default function CompanySection(props: CompanySectionProps) {
  const [status, company] = useCompany(props.siren);
  if (!company) { return null; }
  if (status === Status.LOADING || status === Status.ERROR) {
    return CompanyInfoSectionSkeleton(status);
  }

  const companyFields: Array<{key: keyof Company, label: string}> = [
    { key: 'name', label: 'Name' },
    { key: 'siret', label: 'SIRET' },
    { key: 'address', label: 'Address'}
  ];
  return (
    <section className="section section-company">
      <h3 className="section-title">Company</h3>
      <div className="company-info">
        {companyFields.map(({key, label}) =>
          <p className="field" data-field-key={key} key={key}>
            <span className="field-label">{label}: </span>
            <span className="field-value">{company[key]}</span>
          </p>
        )}
      </div>
    </section>
  );
}

function CompanyInfoSectionSkeleton(status: Status) {
  const errorMessage = (status === Status.ERROR)
    ? <span className="error-message">Sorry, something went wrong :/</span>
    : null;
  return (
    <section className={'company-info skeleton ' + status}>
      {errorMessage}
    </section>
  );
}
