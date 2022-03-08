import { useEffect, useState } from 'react';
import { Status } from '@/models/status.model';
import { Company, fetchCompany } from '@/services/company.service';


export { Status };
export type { Company };

export default function useCompany(
  siren: string | null
): [Status, Company | null] {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      if (!siren) { setStatus(Status.NO_DATA); return; }
      fetchCompany(siren).then(
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
      );
    };
    fetchData();
  }, [siren]);

  return [status, company];
}
