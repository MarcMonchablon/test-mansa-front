import React from 'react';


interface CompanyInfoSectionProps {
  siren: string | null;
}

export default function CompanyInfoSection(props: CompanyInfoSectionProps) {
  return (
    <section className="section companyInfo">
      <h3 className="section-title">Company</h3>
      [Company Info]
    </section>
  );
}
