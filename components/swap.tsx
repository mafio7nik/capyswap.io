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
    Image } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import useFetchTokens from '../hooks/useFetchTokens'
import { useNetwork } from "wagmi";
import { Token } from '../hooks/useFetchTokens'
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import GetTokenPrice from "../hooks/useGetTokenPrice";

// ... (other imports)

export default function SwapMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { chain } = useNetwork();
    const chainid = chain?.id;

    let tokenlist: Token[] = [];

    if (chainid !== undefined) {
        tokenlist = useFetchTokens(chainid);
    }
    
    const defaultTokenSymbol1 = '1INCH'; // Change this to your default token's symbol
    const defaultTokenSymbol2 = 'WETH'; // Change this to your default token's symbol
    const [selectedToken1, setSelectedToken1] = useState<string>(defaultTokenSymbol1);
    const [selectedToken2, setSelectedToken2] = useState<string>(defaultTokenSymbol2);
    const [selecttokenid, setSelectTokenid ] = useState(Number);

    const [searchQuery, setSearchQuery] = useState('');
    const [tokenaddressA, setTokenaddressA] = useState<string>('');
    const [tokenaddressB, setTokenaddressB] = useState<string>('');


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Flex justify="center" align="center" height="100vh" mt="0">
            <Box p="4" border="1px" borderColor="gray.300" borderRadius="10">
                {/* ... (existing code) */}
                <Input placeholder="0" borderRadius="10"/>
                <Button onClick={() => {
                    setSelectTokenid(1);
                    onOpen();
                }} borderRadius={10} mb={2}>
                    <Image src={tokenlist.find(token => token.symbol === selectedToken1)?.logoURI} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                    <Text>{selectedToken1}</Text>
                </Button>
                {/* ... (other code) */}
                <Box>
                    <Input placeholder="0"></Input>
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
                        GetTokenPrice(tokenaddressA, tokenaddressB);
                        console.log(GetTokenPrice);
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
                                                setTokenaddressA(token.address);
                                                onClose();
                                            } else if (selecttokenid === 2) {
                                                setSelectedToken2(token.symbol);
                                                setTokenaddressB(token.address);
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
