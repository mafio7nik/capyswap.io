import * as React from 'react'
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ToggleTheme from './toggleTheme';
export function Header() {
    return (
        <div>
            <header className={styles.header}>
                <Link href='/' passHref>
                <div className={styles.logoContainer}>
                    <Image src="https://github.com/mafio7nik/capyswap.io/blob/main/images/logo.png?raw=true" width={50} height={50} alt="Logo" className={styles.logo} />
                </div>
                </Link>
                <Button mr={0} ml={5} variant="solid">
                <Link href='/swap'>Swap</Link>
                </Button>
                <Button mr={0} ml={5} variant="solid">
                <Link href='/airdrop'>Airdrop</Link>
                </Button>
                <div className={styles.connectButtonContainer}>
                <ConnectButton />
                </div>
                <ToggleTheme />
            </header>
        </div>
    );
};