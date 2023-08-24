// pages/swap.js
import { Flex, Box, Input, Select, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNetwork } from 'wagmi'


type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

export function SwapComponent() {
  const [amountInEth, setAmountInEth] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [tokenList, setTokenList] = useState<Token[]>([]); // Explicitly typed as Token[]
  const { chain, chains } = useNetwork();
  const chainId = chain?.id
  useEffect(() => {
    // Fetch the token list from the URL
    fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org')
      .then(response => response.json())
      .then(data => {
        const tokens = Object.values(data.tokens) as Token[]; // Explicitly cast the data to Token[]
        const filteredTokens = tokens.filter(token => token.chainId === chainId);

        // Sort tokens by symbol
        filteredTokens.sort((a, b) => a.symbol.localeCompare(b.symbol));

        setTokenList(filteredTokens);
      })
      .catch(error => {
        console.error('Error fetching token list:', error);
      });
  }, [chainId]);

  const handleSwap = () => {
    // Use `wagmi.sh` library to perform the swap here
    console.log(`Swapping ${amountInEth} ETH for ${selectedToken}`);
  };

  return (
    <Flex justify="center" align="center" height="100vh">
      <Box p="4" border="1px" borderColor="gray.300" borderRadius="md">
        <Input
          placeholder="Amount in ETH"
          value={amountInEth}
          onChange={(e) => setAmountInEth(e.target.value)}
        />
        <Select
          placeholder="Select a token"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          mt="3"
        >
          {tokenList.map(token => (
            <option key={token.address} value={token.symbol}>
              {token.name} ({token.symbol})
            </option>
          ))}
        </Select>
        <Button onClick={handleSwap} colorScheme="blue" mt="3">
          Swap
        </Button>
      </Box>
    </Flex>
  );
}
