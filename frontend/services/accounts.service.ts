export interface Account {
  id: string;
  type: string;
  number: string;
  balance: number;
  currency: string;
}


export async function fetchAccounts(_userId: string): Promise<Account[]> {
  // Here the userId isn't really used, but it's closer to a real-world usage, hence it's presence.
  const url = 'https://kata.getmansa.tech/accounts';
  return fetch(url)
    .then(response => response.json())
    .then(arr => arr.map((raw: any) => formatAccount(raw)));
}


function formatAccount(raw: any): Account {
  return {
    id: raw.account_id,
    type: raw.account_type.toLowerCase(),
    number: raw.account_number,
    balance: raw.current,
    currency: raw.currency,
  };
}
