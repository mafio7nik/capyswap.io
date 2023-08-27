// useSearchTokenMenu.ts
import { useState } from 'react';
import { Token } from './useFetchTokens';
import { Modal, ModalContent, ModalHeader, ModalOverlay, Button, Text, Image, Box, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { useNetwork } from 'wagmi';

function useSearchTokenMenu(inputid: number) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { chain } = useNetwork();
    const chainid = chain?.id;

    let tokenlist: Token[] = [];
    
    const defaultTokenSymbol1 = '1INCH'; // Change this to your default token's symbol
    const defaultTokenSymbol2 = 'WETH'; // Change this to your default token's symbol
    const [selectedToken1, setSelectedToken1] = useState<string>(defaultTokenSymbol1);
    const [selectedToken2, setSelectedToken2] = useState<string>(defaultTokenSymbol2);
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {tokenlist.map(token => (
                        <Button
                            key={token.address}
                            value={token.symbol}
                            onClick={() => {
                                setSelectedToken2(token.symbol); // Update this to setSelectedToken2 for the second button
                                onClose();
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
                    ))}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
};

export default useSearchTokenMenu;
