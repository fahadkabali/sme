import React from 'react';
import Head from 'next/head';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
    <DashboardLayout>
        {children}
    </DashboardLayout>
    </>
  );
};

export default Layout;