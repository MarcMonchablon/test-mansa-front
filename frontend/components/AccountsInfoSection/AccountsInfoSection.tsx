import React from 'react';

interface AccountsInfoSectionProps {
  userId: string;
}

export default function AccountsInfoSection(props: AccountsInfoSectionProps) {
  const userId = props.userId;
  return (
    <section className="section accountsInfo">
      <h3 className="section-title">Accounts</h3>
      [Accounts Info]
    </section>
  );
}
