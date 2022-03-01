import React from 'react';
import Header from '@/components/Header/Header';


export default function MainLayout(props: any) {
  return (
    <div className="main-layout">
      <Header />
      {props.children}
    </div>
  )
}
