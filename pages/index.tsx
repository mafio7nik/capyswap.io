import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MintNFT } from '../components/mint';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Input, Stack } from '@chakra-ui/react';
import styles from '../styles/Home.module.css'
import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '../components/header'
import SwapMenu from '../components/swap';
import SwapComponent from '../components/SwapPage';
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header />
      <main className={styles.main}>
        <SwapComponent />
      </main>
      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
