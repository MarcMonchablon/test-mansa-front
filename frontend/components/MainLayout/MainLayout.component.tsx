import React from 'react';
import Head from 'next/head';
import Header from '@/components/MainLayout/Header.component';


interface MainLayoutProps {
  title?: string;
  children?: any;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Head>
        <title>{props.title || 'Mansa'}</title>
      </Head>
      <Header />
      {props.children}
    </div>
  )
}
