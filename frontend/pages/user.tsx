import React from 'react';
import {
  GetServerSidePropsContext as SspContext,
  GetServerSidePropsResult as SspResult
} from 'next';

import { User, getUser } from '@/services/session';
import MainLayout from '@/components/MainLayout/MainLayout';
import UserTitle from '@/components/UserTitle/UserTitle';
import CompanySection from '@/components/CompanySection/CompanySection';
import AccountsInfoSection from '@/components/AccountsInfoSection/AccountsInfoSection';

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
      <div className="page userPage">
        <UserTitle user={user} />
        <CompanySection siren={user.siren || null} />
        <AccountsInfoSection userId={user.id} />
      </div>
    </MainLayout>
  );
}
