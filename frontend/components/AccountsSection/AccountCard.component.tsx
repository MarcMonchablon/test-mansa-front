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
      <p className="field main-field" data-field-key="account-number">
        <span className="field-label">Account Number: </span>
        <span className="field-value">{account.number}</span>
      </p>
      <p className="field" data-field-key="balance">
        <span className="field-label">Balance: </span>
        <span className="field-value">{account.balance} {account.currency}</span>
      </p>
    </div>
  );
}

export function AccountCardSkeleton() {
  return (
    <div className="account-card skeleton loading">
      <p className="field main-field" data-field-key="account-number">
        <span className="field-label">Account Number: </span>
        <span className="field-value">(loading)</span>
      </p>
      <p className="field" data-field-key="balance">
        <span className="field-label">Balance: </span>
        <span className="field-value">(loading)</span>
      </p>
    </div>
  );
}
