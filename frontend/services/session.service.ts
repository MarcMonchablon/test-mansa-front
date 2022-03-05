
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  siren?: string;
}


export function getUser(): User {
  const mockUser: User = {
    id: '123',
    firstname: 'Rémy',
    lastname: 'Tinco',
    siren: '852379890',
  };
  return mockUser;
}
