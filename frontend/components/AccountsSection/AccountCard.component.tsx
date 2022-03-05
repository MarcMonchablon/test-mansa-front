import React, { useEffect, useState } from 'react';
import { Account } from '@/services/accounts.service';


type AccountCardProps = {
  account?: Account,
}

export default function AccountCard(props: AccountCardProps) {
  const account = props.account;
  if (!account) { return AccountCardSkeleton(); }
  return (
    <div className="account-card" data-account-id={account.id}>
      <p className="text account-number">Account Number: {account.number}</p>
      <p className="text account-balance">Balance: {account.balance} {account.currency}</p>
    </div>
  );
}

export function AccountCardSkeleton() {
  return (
    <div className="account-card skeleton loading">
      <p className="text">loading Number: (loading)</p>
      <p className="text">Balance: (loading)</p>
    </div>
  );
}
