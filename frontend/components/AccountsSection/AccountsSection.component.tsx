import React from 'react';
import useAccounts, { Status, Account } from '@/hooks/useAccounts.hook';
import AccountCard from '@/components/AccountsSection/AccountCard.component';


interface AccountsSectionProps {
  userId: string;
}

export default function AccountsSection(props: AccountsSectionProps) {
  const [status, accounts] = useAccounts(props.userId);
  if (status === Status.NO_DATA) { return null; }
  if (status === Status.ERROR) {
    return (
      <section className="section section-accounts error">
        <h3 className="section-title">Accounts</h3>
        <p className="error-message">Accounts could not be fetched</p>
      </section>
    );
  }

  return (
    <section className="section section-accounts">
      <h3 className="section-title">Accounts</h3>
      <div className="account-cards-container">
        {(status === Status.OK)
          ? accounts.map(account => <AccountCard account={account} key={account.id} />)
          : <AccountCard />
        }
      </div>
    </section>
  );
}
