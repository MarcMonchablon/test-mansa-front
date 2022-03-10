import React from 'react';
import {
  GetServerSidePropsContext as SspContext,
  GetServerSidePropsResult as SspResult
} from 'next';

import { User, getUser } from '@/services/session.service';
import MainLayout from '@/components/MainLayout/MainLayout.component';
import CompanySection from '@/components/CompanySection/CompanySection.component';
import AccountsSection from '@/components/AccountsSection/AccountsSection.component';
import UserInitialsBadge from '@/components/UserInitialsBadge/UserInitialsBadge';

interface UserPageProps {
  user: User;
}

export async function getServerSideProps(
  context: SspContext
): Promise<SspResult<UserPageProps>> {
  return {
    props: { user: getUser() }
  };
}

export default function UserPage(props: UserPageProps) {
  const user = props.user;
  const userBadgeBackground = '#6347D1';
  return (
    <MainLayout>
      <div className="page user-page">
        <div className="user-title">
          <UserInitialsBadge user={user} background={userBadgeBackground} />
          <div className="user-name">
            <span className="lastname">{user.lastname}</span>
            &nbsp;
            <span className="firstname">{user.firstname}</span>
          </div>
        </div>
        <CompanySection siren={user.siren || null} />
        <AccountsSection userId={user.id} />
      </div>
    </MainLayout>
  );
}
