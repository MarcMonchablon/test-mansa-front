import React from 'react';
import {
  GetServerSidePropsContext as SspContext,
  GetServerSidePropsResult as SspResult
} from 'next';

import { User, getUser } from '@/services/session.service';
import MainLayout from '@/components/MainLayout/MainLayout.component';
import UserTitle from '@/components/UserTitle/UserTitle.component';
import CompanySection from '@/components/CompanySection/CompanySection.component';
import AccountsSection from '@/components/AccountsSection/AccountsSection.component';

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
  return (
    <MainLayout>
      <div className="page user-page">
        <UserTitle user={user} />
        <CompanySection siren={user.siren || null} />
        <AccountsSection userId={user.id} />
      </div>
    </MainLayout>
  );
}
