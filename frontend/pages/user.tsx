import React from 'react';
import MainLayout from '@/components/MainLayout/MainLayout';


export default function UserPage() {
  return (
    <MainLayout>
      <div className="page userPage">
        <h2>[User Page]</h2>
        <p>[UserBadge]</p>
        <p>[CompanySection]</p>
        <p>[AccountsSection]</p>
      </div>
    </MainLayout>
  );
}
