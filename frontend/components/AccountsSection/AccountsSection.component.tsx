import React, { useEffect, useState } from 'react';
import { Account, fetchAccounts } from '@/services/accounts.service';
import { Status } from '@/models/status.model';
import AccountCard from '@/components/AccountsSection/AccountCard.component';


interface AccountsSectionProps {
  userId: string;
}

export default function AccountsSection(props: AccountsSectionProps) {
  const userId = props.userId;
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [accounts, setAccounts] = useState<Account[]>([])
  useEffect(() => {
    const fetchData = async() => {
      fetchAccounts(userId).then(
        accountsArr => {
          if (accountsArr.length > 0) {
            setAccounts(accountsArr);
            setStatus(Status.OK);
          } else {
            setStatus(Status.NO_DATA);
          }
        },
        error => {
          console.warn('[AccountInfoCardsList] Could not fetch accounts: ', error);
          setStatus(Status.ERROR);
        }
      );
    }
    fetchData();
  }, [userId])

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
      <div className="cards-container">
        {(status === Status.OK)
          ? accounts.map(account => <AccountCard account={account} key={account.id} />)
          : <AccountCard />
        }
      </div>
    </section>
  );
}



