import { 
    Flex, 
    Box, 
    Menu, 
    MenuButton, 
    Input, 
    Text, 
    Container, 
    Popover, 
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    useDisclosure,
    Select,
    Image, 
    getToken} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
//import useFetchTokens from '../hooks/useFetchTokens'
import { useNetwork } from "wagmi";
import { Token } from '../hooks/useFetchTokens'
import React, { useState, useEffect, use } from 'react';
import dynamic from "next/dynamic";
import GetTokenPrice from "../hooks/useGetTokenPrice";
import useGetTokenAddress from "../hooks/useGetTokenadress";
import axios from "axios";
import waitUntil from "async-wait-until";
import tokenlistjson from '../public/data/tokens.uniswap.json'
// ... (other imports)
interface TokenPrices {
    ratio: number;
    // Add other properties if needed
}

export default function SwapMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { chain } = useNetwork();
    const chainid = chain?.id;
    const defaultTokenSymbol1 = 'USDT'; // Change this to your default token's symbol
    const defaultTokenSymbol2 = 'WETH'; // Change this to your default token's symbol
    const [selectedToken1, setSelectedToken1] = useState<string>(defaultTokenSymbol1);
    const [selectedToken2, setSelectedToken2] = useState<string>(defaultTokenSymbol2);
    const [selecttokenid, setSelectTokenid ] = useState(Number);
    const [tokenlist, setTokenList] = useState<Token[]>([]); // Add this line
    const [tokenOneAmount, setTokenOneAmount] = useState('');
    const [tokenTwoAmount, setTokenTwoAmount] = useState('');
    const [prices1, setPrices1] = useState();
    const [prices2, setPrices2] = useState();
    
    const chainname = chain?.name;

    const tokenadress1 = useGetTokenAddress(tokenlist, selectedToken1, chainid || 0);
    const tokenadress2 = useGetTokenAddress(tokenlist, selectedToken2, chainid || 0);

    useEffect(() => {
        fetchPrices(tokenadress1, tokenadress2);
        FetchTokens(chainid || 0);
    }, [tokenadress1, tokenadress2, chainid]);

    const [searchQuery, setSearchQuery] = useState('');
    const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenOneAmount(event.target.value);
        const tokenTwoAmount = Number(event.target.value) * Number(prices1);
        setTokenTwoAmount(tokenTwoAmount.toString());
        console.log('chage', tokenOneAmount);
        console.log('chage', tokenTwoAmount);
        console.log('chage', prices1);
    };

    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenTwoAmount(event.target.value);
        const tokenTwoAmount = Number(event.target.value) * Number(prices2);
        setTokenOneAmount(tokenTwoAmount.toString());
        console.log('chage', tokenOneAmount);
        console.log('chage', tokenTwoAmount);
        console.log('chage', prices2);
      };
    
    //console.log('selectedtokenaddress1', selectedtokenaddress1);
     
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async function FetchTokens(chainid: number) {
  
        const refreshTokenList = () => {
          // Fetch the token list from the URL
          
          const tokens = tokenlistjson.tokens as Token[];
          const connectedchainId = chainid;
          // Filter tokens based on connected network (Binance Smart Chain)
          const filteredTokens = tokens.filter(token => token.chainId === connectedchainId);
      
          // Sort tokens by symbol
          filteredTokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
      
          setTokenList(filteredTokens);
        
        };
        
      };
    
    async function fetchPrices(one: any, two: any) {
        try {
            const res = await GetTokenPrice(await one, await two, await chainname);
            setPrices1(res.ratio1);
            setPrices2(res.ratio2);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Flex justify="center" align="center" height="100vh" mt="0">
            <Box p="4" border="1px" borderColor="gray.300" borderRadius="10">
                {/* ... (existing code) */}
                <Input placeholder="0" borderRadius="10" onChange={handleInputChange1} value={tokenOneAmount} onClick={() =>{
                    setTokenTwoAmount('');
                    handleInputChange1;
                }}/>
                <Button onClick={() => {
                    setSelectTokenid(1);
                    onOpen();
                }} borderRadius={10} mb={2}>
                    <Image src={tokenlist.find(token => token.symbol === selectedToken1)?.logoURI} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                    <Text>{selectedToken1}</Text>
                </Button>
                {/* ... (other code) */}
                <Box>
                    <Input placeholder="0" onChange={handleInputChange2} value={tokenTwoAmount}  onClick={() => {
                        setTokenOneAmount('');
                        handleInputChange2;
                    }}></Input>
                    <Button onClick={() => {
                    setSelectTokenid(2);
                    onOpen();
                }} borderRadius={10} mb={2} mt={2}>
                        <Image src={tokenlist.find(token => token.symbol === selectedToken2)?.logoURI} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                        <Text>{selectedToken2}</Text>
                    </Button>
                </Box>
                <Box alignItems="center">
                    <Button borderRadius="10" mt={2} onClick={() => {
                    }}>Swap</Button>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Search tokens..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                mb={3}
                            />
                            {tokenlist.map(token => (
                                (searchQuery === '' || token.name.toLowerCase().includes(searchQuery.toLowerCase())) && (
                                    <Button
                                        key={token.address}
                                        value={token.symbol}
                                        onClick={() => {
                                            if (selecttokenid === 1) {
                                                setSelectedToken1(token.symbol);
                                                onClose();
                                            } else if (selecttokenid === 2) {
                                                setSelectedToken2(token.symbol);
                                                onClose();
                                            }
                                        }}
                                        variant="outline"
                                        size="lg"
                                        w="100%"
                                        mb={3}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Image
                                            src={token.logoURI}
                                            alt={token.name}
                                            style={{ width: '24px', height: '24px', marginRight: '8px' }}
                                        />
                                        {token.name}
                                        <ChevronRightIcon onClick={onClose} />
                                    </Button>
                                )
                            ))}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Flex>
    );
};
