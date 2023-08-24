import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork, 
  useSwitchNetwork, 
} from 'wagmi'
import { Button,
    Input, 
    Stack, 
    Link, 
    Spinner, 
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, 
    Box,
    CloseButton, useDisclosure,  } from '@chakra-ui/react';

export function MintNFT() {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0x2E169a4Fe328A79E1884AB740F011590A1a8a466',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
    value: BigInt(0),
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div>
      {isLoading ? (
        // Render the Spinner component while loading
        <div>Waiting for transaction to complete...<Spinner size="sm" color="blue.500" /></div>
      ) : (
        <Button disabled={!write} onClick={write}>
          {isSuccess ? 'Minted' : 'Mint'}
        </Button>
      )}
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <Link href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</Link>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && ( // Check if the alert should be visible
        <Box position="fixed" bottom={4} right={4}>
          <Alert status="error" variant="top-accent" borderRadius={10}>
            <AlertIcon />
            {(prepareError || error)?.message}
          </Alert>
        </Box>
      )}
    </div>
  )
}
