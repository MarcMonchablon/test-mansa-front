import React from 'react';
import { User } from '@/services/session';


interface UserTitleProps {
  user: User;
}

export default function UserTitle(props: UserTitleProps) {
  const {user} = props;
  return (
    <div className="userTitle">
      <UserBadge />
      <span className="name">
        {user.firstname} {user.lastname}
      </span>
    </div>
  );
}

function UserBadge() {
  // TODO
  return (
    <></>
  );
}
