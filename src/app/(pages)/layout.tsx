import React from 'react';
import Head from 'next/head';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Footer from '../../components/dashboard/Footer';
import Dashboard from '../../components/dashboard/Dashboard';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <main>{children}</main>
      </DashboardLayout>
      <Footer />
    </>
  );
};

export default Layout;