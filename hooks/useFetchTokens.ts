import React, { useState, useEffect } from 'react';
import { useNetwork } from 'wagmi'
import dynamic from 'next/dynamic';
import tokenlist from '../public/data/tokens.uniswap.json'

export type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

function useFetchTokens(chainid: number) {
  
  const [amountInEth, setAmountInEth] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [tokenList, setTokenList] = useState<Token[]>([]);

  useEffect(() => {
    refreshTokenList(); // Fetch the token list and refresh whenever the network changes
  }, [chainid]);

  const refreshTokenList = () => {
    // Fetch the token list from the URL
    
    const tokens = tokenlist.tokens as Token[];
    const connectedchainId = chainid;
    // Filter tokens based on connected network (Binance Smart Chain)
    const filteredTokens = tokens.filter(token => token.chainId === connectedchainId);

    // Sort tokens by symbol
    filteredTokens.sort((a, b) => a.symbol.localeCompare(b.symbol));

    setTokenList(filteredTokens);
  
  };
  return tokenList;
};
export default useFetchTokens;