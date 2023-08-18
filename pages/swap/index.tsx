import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Input, Stack } from '@chakra-ui/react';
import styles from 'styles/Home.module.css'
import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
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
      <header className={styles.header}>
        <div className={styles.logocontainer}>
          <Link href='/'>
            <Image src="https://github.com/mafio7nik/capyswap.io/blob/main/images/logo.png?raw=true" width={50} height={50} alt="Logo" />
          </Link>
        </div>
        <Button mr={10} ml={10}  variant="solid"><Link href='/airdrop'>Airdrop</Link></Button> 
        <ConnectButton/>
      </header>
      <main className={styles.main}>
        
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