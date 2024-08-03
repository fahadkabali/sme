import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import withAuth from '@components/withAuth';

export default function Home() {
  return (
    <withAuth/>
  );
}