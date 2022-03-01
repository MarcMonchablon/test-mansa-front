import React from 'react';
import {
  GetServerSidePropsContext as SspContext,
  GetServerSidePropsResult as SspResult
} from 'next';

import { User, getUser } from '@/services/session';
import MainLayout from '@/components/MainLayout/MainLayout';

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
        <p>[UserBadge #{user.id}]</p>
        <p>[CompanySection]</p>
        <p>[AccountsSection]</p>
      </div>
    </MainLayout>
  );
}
