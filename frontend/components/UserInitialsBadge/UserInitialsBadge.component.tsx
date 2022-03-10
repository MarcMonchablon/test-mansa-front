import React from 'react';
import styled from 'styled-components';
import { User } from '@/services/session.service';


interface UserInitialsBadgeProps {
  user: User;
  background: string;
}

export default function UserInitialsBadge(props: UserInitialsBadgeProps) {
  const initials = getUserInitials(props.user);
  return (
    <StyledBadge
      background={props.background}
      aria-hidden="true">
      {initials}
    </StyledBadge>
  );
}


interface StyledBadgeProps {
  background: string;
}

const StyledBadge = styled.div<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  padding: 0.4em;
  border-radius: 100%;
  background: ${props => props.background};
  color: white;
`;

function getUserInitials(user: User): string {
  const initials = [user.lastname, user.firstname]
    .filter(str => !!str)
    .map(str => str[0].toUpperCase())
    .join('');
  return initials || '??';
}
