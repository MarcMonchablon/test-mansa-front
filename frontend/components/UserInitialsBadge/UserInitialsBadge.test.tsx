import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { User } from '@/services/session.service';
import UserInitialsBadge from './UserInitialsBadge';


// === SETUP =====================================
let container: Element | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (!container) { return; }
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})


// === TESTS ====================================

describe('UserInitialsBadge', () => {
  it.each([
    {user: mockUser('Chris', 'Redfield'), initials: 'RC'},
    {user: mockUser('Jill', 'Valentine'), initials: 'VJ'},
    {user: mockUser('Barry', 'Burton'), initials: 'BB'},
    {user: mockUser('Fonzie', ''), initials: 'F'},
    {user: mockUser('', 'Neo'), initials: 'N'},
  ])('displays $user.firstname $user.lastname initials as $initials', async ({user, initials}) => {
    await act(async () => {
      render(<UserInitialsBadge user={user} background="pink" />, container);
    });
    expect(container?.textContent).toBe(initials);
  });

  it('displays ?? when first and last names are both empty', async () => {
    const EMPTY_USER = mockUser('', '');
    await act(async () => {
      render(<UserInitialsBadge user={EMPTY_USER} background="pink" />, container);
    });
    expect(container?.textContent).toBe('??');
  });
});


// === HELPERS ==================================

function mockUser(firstname: string, lastname: string): User {
  return { id: 'mock-user-id', firstname, lastname };
}
