import { Status } from '@/models/status.model';
import { Account, fetchAccounts } from '@/services/accounts.service';
import { useEffect, useState } from 'react';


export { Status };
export type { Account };

export default function useAccounts(
  userId: string
): [Status, Account[]] {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [accounts, setAccounts] = useState<Account[]>([]);
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
    };
    fetchData();
  }, [userId]);
  return [status, accounts];
}

