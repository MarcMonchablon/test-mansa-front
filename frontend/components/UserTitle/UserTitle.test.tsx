import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { User } from '@/services/session';
import UserTitle from './UserTitle';


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

describe('UserTitle', () => {
  const MOCK_USER: User = {
    id: 'mock-user',
    firstname: 'Jane',
    lastname: 'Smith',
  };

  it('displays the user\'s name', () => {
    render(<UserTitle user={MOCK_USER} />, container);
    expect(container?.textContent).toBe('Jane Smith');
  })
});

