import React, { useEffect, useState } from 'react';
import { Company, fetchCompany } from '@/services/company';


enum Status {
  LOADING = 'loading',
  OK = 'ok',
  NO_DATA = 'no-data',
  ERROR = 'error',
}

interface CompanySectionProps {
  siren: string | null;
}


export default function CompanySection(props: CompanySectionProps) {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [company, setCompany] = useState<Company | null>(null);
  useEffect(() => {
    const fetchData = async() => {
      if (!props.siren) { setStatus(Status.NO_DATA); return; }
      fetchCompany(props.siren).then(
        companyData => {
          if (companyData) {
            setCompany(companyData);
            setStatus(Status.OK);
          } else {
            setStatus(Status.NO_DATA);
          }
        },
        error => {
          console.warn('[useCompany] Could not fetch data: ', error);
          setStatus(Status.ERROR);
        }
      )
    };
    fetchData();
  }, [props.siren])
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
    <section className="section companyInfo">
      <h3 className="section-title">Company</h3>
      {companyFields.map(({key, label}) =>
        <p className={`field field--${key}`} key={key}>
          <span className="field-key">{label}:</span>
          <span className="field-value">{company[key]}</span>
        </p>
      )}
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
